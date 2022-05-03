import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { EnclaveService } from 'src/app/services/enclave/index';
import { XrplService } from 'src/app/services/xrpl.service';
import {
  hexToUint8Array,
  txnAfterSign,
  txnBeforeSign,
  uint8ArrayToHex,
} from 'src/app/services/xrpl.utils';
import { SessionService } from 'src/app/state/session.service';
import { withLoggedExchange } from 'src/app/utils/console.helpers';
import { panic } from 'src/app/utils/errors/panic';
import { parseNumber } from 'src/app/utils/validators';
import { ifDefined } from 'src/helpers/helpers';
import { TransactionSigned, TransactionToSign } from 'src/schema/actions';
import * as xrpl from 'xrpl';
import { IssuedCurrencyAmount } from 'xrpl/dist/npm/models/common/index';
import { Trustline } from 'xrpl/dist/npm/models/methods/accountLines';
import { SessionQuery } from './session.query';
import { SessionStore, XrplBalance } from './session.store';

/**
 * This service manages session state and operations related to the XRP ledger.
 */
@Injectable({ providedIn: 'root' })
export class SessionXrplService {
  constructor(
    private sessionStore: SessionStore,
    private sessionQuery: SessionQuery,
    private sessionService: SessionService,
    private enclaveService: EnclaveService,
    private xrplService: XrplService
  ) {}

  /**
   * Load the current wallet's XRPL account info from {@link XrplService}.
   *
   * This updates:
   *
   * - {@link import('./session.store').SessionState#xrplAccountRoot}.
   * - {@link import('./session.store').SessionState#xrplBalances}.
   */
  async loadAccountData(): Promise<void> {
    const { wallet } = this.sessionQuery.assumeActiveSession();
    const xrplAddress = wallet.xrpl_account.address_base58;

    // TODO: Fetch the following in parallel, sharing a connection context.

    // Get AccountRoot entry:
    const accountInfo = await this.xrplService.getAccountInfoIfExists({
      account: xrplAddress,
    });
    if (accountInfo === undefined) {
      console.log(
        'SessionXrplService.loadAccountData: account not found, bailing out',
        { xrplAddress }
      );
      return;
    }
    const xrplAccountRoot: xrpl.LedgerEntry.AccountRoot =
      accountInfo.result.account_data;

    // Get account's trust lines:
    const accountLines = await this.xrplService.getAccountLines({
      account: xrplAddress,
    });
    const xrplTrustlines: Trustline[] = accountLines.result.lines;

    // Get balances:
    const xrplBalances: XrplBalance[] = await this.xrplService.getBalances(
      xrplAddress
    );

    this.sessionStore.update({ xrplAccountRoot, xrplTrustlines, xrplBalances });
  }

  async sendFunds(
    receiverId: string,
    amount: xrpl.Payment['Amount']
  ): Promise<xrpl.TxResponse> {
    const { wallet } = this.sessionQuery.assumeActiveSession();

    const preparedTx: xrpl.Payment = await withLoggedExchange(
      'SessionXrplService.sendFunds: XrplService.createUnsignedTransaction:',
      async () =>
        await this.xrplService.createUnsignedTransaction(
          wallet.xrpl_account.address_base58,
          receiverId,
          amount
        ),
      { from: wallet.xrpl_account.address_base58, to: receiverId, amount }
    );

    return await this.sendTransaction(preparedTx);
  }

  /**
   * Sign and send a `TrustSet` transaction from the active session's wallet.
   *
   * @see https://xrpl.org/trustset.html
   * @see XrplService.createUnsignedTrustSetTx
   */
  async sendTrustSetTx(
    limitAmount: IssuedCurrencyAmount
  ): Promise<xrpl.TxResponse> {
    const { wallet } = this.sessionQuery.assumeActiveSession();

    const preparedTx: xrpl.TrustSet = await withLoggedExchange(
      'SessionXrplService.sendTrustSetTx: XrplService.createUnsignedTrustSetTx:',
      async () =>
        await this.xrplService.createUnsignedTrustSetTx(
          wallet.xrpl_account.address_base58,
          limitAmount
        ),
      { from: wallet.xrpl_account.address_base58, limitAmount }
    );

    return await this.sendTransaction(preparedTx);
  }

  /**
   * Check trustline opt-in for each of this account's trust lines.
   *
   * @return The responses to `TrustSet` transactions sent out (empty if none sent)
   * @see checkTrustlineOptIn
   */
  async checkTrustlineOptIns(): Promise<xrpl.TxResponse[]> {
    // TODO(Pi): Check for necessary owner reserves before sending.
    //           See: https://xrpl.org/reserves.html

    const trustLines =
      (await firstValueFrom(this.sessionQuery.xrplTrustlines)) ?? [];

    const txResponses: xrpl.TxResponse[] = [];
    for (const trustLine of trustLines) {
      ifDefined(await this.checkTrustlineOptIn(trustLine), (txResponse) =>
        txResponses.push(txResponse)
      );
    }
    return txResponses;
  }

  /**
   * Helper: Check trustline opt-in for the given trust-line.
   *
   * This sends a `TrustSet` transaction matching the peer's limit
   * if the active session's wallet's limit is zero.
   *
   * @return the `TrustSet` response, or undefined
   */
  async checkTrustlineOptIn(
    trustline: Trustline
  ): Promise<xrpl.TxResponse | undefined> {
    const limit_peer = parseNumber(trustline.limit_peer);
    if (limit_peer === undefined) {
      throw panic(
        'SessionXrplService.checkTrustlineOptIn: bad limit_peer:',
        trustline
      );
    }

    if (trustline.limit === '0' && 0 < limit_peer) {
      const limitAmount = {
        currency: trustline.currency,
        issuer: trustline.account,
        value: trustline.limit_peer, // XXX: For now, just match the peer's limit.
      };
      return await withLoggedExchange(
        'SessionXrplService.checkTrustlineOptIn: sending TrustSet',
        async () => await this.sendTrustSetTx(limitAmount),
        limitAmount
      );
    }
  }

  /**
   * Helper: Sign, submit, and confirm the given transaction.
   *
   * NOTE: This does not check for success: the caller is responsible for that.
   */
  protected async sendTransaction(
    txnUnsigned: xrpl.Transaction
  ): Promise<xrpl.TxResponse> {
    const { wallet } = this.sessionQuery.assumeActiveSession();

    const { txnBeingSigned, bytesToSignEncoded } = txnBeforeSign(
      txnUnsigned,
      wallet.xrpl_account.public_key_hex
    );

    const transactionToSign: TransactionToSign = {
      XrplTransaction: {
        transaction_bytes: hexToUint8Array(bytesToSignEncoded),
      },
    };
    const signed: TransactionSigned = await this.sessionService.signTransaction(
      transactionToSign
    );

    if ('XrplTransactionSigned' in signed) {
      const { signature_bytes } = signed.XrplTransactionSigned;

      const { txnSigned, txnSignedEncoded } = txnAfterSign(
        txnBeingSigned,
        uint8ArrayToHex(signature_bytes)
      );

      const txResponse: xrpl.TxResponse = await withLoggedExchange(
        'SessionXrplService.sendTransaction: signed, submitting:',
        async () =>
          await this.xrplService.submitAndWaitForSigned(txnSignedEncoded),
        txnSignedEncoded
      );

      await this.loadAccountData(); // FIXME(Pi): Move to caller?

      return txResponse;
    } else {
      throw panic(
        'SessionXrplService.sendTransaction: expected XrplTransactionSigned, got:',
        signed
      );
    }
  }
}
