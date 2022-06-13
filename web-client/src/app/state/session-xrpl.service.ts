import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { EnclaveService } from 'src/app/services/enclave/index';
import { XrplService } from 'src/app/services/xrpl.service';
import {
  checkTxResponseSucceeded,
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
import { ConnectorQuery } from './connector';
import { SessionQuery } from './session.query';
import { SessionStore, XrplBalance } from './session.store';

/**
 * This service manages session state and operations related to the XRP ledger.
 */

// TODO(Herman): Move these types to a better place?

export type TransactionSuccess = {
  success: true;
  response: xrpl.TxResponse;
};
export type TransactionFailure = {
  success: false;
  response: xrpl.TxResponse;
  resultCode: xrpl.TransactionMetadata['TransactionResult'];
};

export type CommissionedTxResponse =
  | {
      mainTx: TransactionSuccess;
      commissionedTx: TransactionSuccess;
    }
  /** Commission transaction will not be sent if the main transaction fails */
  | {
      mainTx: TransactionFailure;
      commissionedTx: undefined;
    }
  | {
      mainTx: TransactionSuccess;
      commissionedTx: TransactionFailure;
    };
@Injectable({ providedIn: 'root' })
export class SessionXrplService {
  constructor(
    private sessionStore: SessionStore,
    private sessionQuery: SessionQuery,
    private sessionService: SessionService,
    private enclaveService: EnclaveService,
    private xrplService: XrplService,
    private connectorQuery: ConnectorQuery
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
    const preparedTx: xrpl.Payment = await this.prepareUnsignedTransaction(
      receiverId,
      amount
    );

    const txResponse = await this.sendTransaction(preparedTx);
    await this.loadAccountData();
    return txResponse;
  }

  async sendFundsCommissioned(
    receiverId: string,
    mainAmount: xrpl.Payment['Amount'],
    commissionAmount: xrpl.Payment['Amount']
  ): Promise<CommissionedTxResponse> {
    const connectorWalletId = this.connectorQuery.getValue().walletId;

    if (!connectorWalletId) {
      throw panic(
        'No wallet id for connector. Cannot do a commissioned transaction',
        connectorWalletId
      );
    }
    const mainTxnUnsigned: xrpl.Payment = await this.prepareUnsignedTransaction(
      receiverId,
      mainAmount
    );

    const signedMainTxn = await this.signTransaction(mainTxnUnsigned);

    // Only submit commission transaction once the main transaction have succeeded.
    // There is currently no way to submit 2 transactions as an atomic unit with XRPL
    const txResponse = await this.submitTransaction(signedMainTxn);
    const txSucceeded = checkTxResponseSucceeded(txResponse);
    if (!txSucceeded.succeeded) {
      return {
        mainTx: {
          success: false,
          response: txResponse,
          resultCode: txSucceeded.resultCode,
        },
        commissionedTx: undefined,
      };
    }

    const commissionTxnUnsigned: xrpl.Payment =
      await this.prepareUnsignedTransaction(
        connectorWalletId,
        commissionAmount
      );

    const signedCommissionTxn = await this.signTransaction(
      commissionTxnUnsigned
    );

    const commissionTxResponse = await this.submitTransaction(
      signedCommissionTxn
    );

    const commissionTxSucceeded =
      checkTxResponseSucceeded(commissionTxResponse);

    if (!commissionTxSucceeded.succeeded) {
      await this.loadAccountData();
      return {
        mainTx: {
          success: true,
          response: txResponse,
        },
        commissionedTx: {
          success: false,
          response: commissionTxResponse,
          resultCode: commissionTxSucceeded.resultCode,
        },
      };
    }

    await this.loadAccountData();
    return {
      mainTx: {
        success: true,
        response: txResponse,
      },
      commissionedTx: {
        success: true,
        response: commissionTxResponse,
      },
    };
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

  async deleteAccount(receiverAddress: string): Promise<xrpl.TxResponse> {
    const { wallet } = this.sessionQuery.assumeActiveSession();

    const preparedTx: xrpl.AccountDelete = await withLoggedExchange(
      'SessionXrplService.deleteAccount: XrplService.createUnsignedDeleteTransaction:',
      async () =>
        await this.xrplService.createUnsignedDeleteTransaction(
          wallet.xrpl_account.address_base58,
          receiverAddress
        ),
      { from: wallet.xrpl_account.address_base58, to: receiverAddress }
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

  protected async prepareUnsignedTransaction(
    receiverId: string,
    amount: xrpl.Payment['Amount']
  ): Promise<xrpl.Payment> {
    const { wallet } = this.sessionQuery.assumeActiveSession();

    return withLoggedExchange(
      'SessionXrplService.sendFunds: XrplService.createUnsignedPaymentTransaction:',
      async () =>
        await this.xrplService.createUnsignedPaymentTransaction(
          wallet.xrpl_account.address_base58,
          receiverId,
          amount
        ),
      { from: wallet.xrpl_account.address_base58, to: receiverId, amount }
    );
  }

  protected async signTransaction(
    txnUnsigned: xrpl.Transaction
  ): Promise<string> {
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

      return txnAfterSign(txnBeingSigned, uint8ArrayToHex(signature_bytes))
        .txnSignedEncoded;
    } else {
      throw panic(
        'SessionXrplService.sendTransaction: expected XrplTransactionSigned, got:',
        signed
      );
    }
  }

  protected async submitTransaction(
    signedTransaction: string
  ): Promise<xrpl.TxResponse> {
    return withLoggedExchange(
      'SessionXrplService.sendTransaction: signed, submitting:',
      async () =>
        await this.xrplService.submitAndWaitForSigned(signedTransaction),
      signedTransaction
    );
  }
  /**
   * Helper: Sign, submit, and confirm the given transaction.
   *
   * NOTE: This does not check for success: the caller is responsible for that.
   */
  protected async sendTransaction(
    txnUnsigned: xrpl.Transaction
  ): Promise<xrpl.TxResponse> {
    const txnSignedEncoded = await this.signTransaction(txnUnsigned);
    const txResponse = await this.submitTransaction(txnSignedEncoded);

    return txResponse;
  }
}
