import { Injectable } from '@angular/core';
import { EnclaveService } from 'src/app/services/enclave/index';
import { XrplService } from 'src/app/services/xrpl.service';
import {
  hexToUint8Array,
  txnAfterSign,
  txnBeforeSign,
  uint8ArrayToHex,
} from 'src/app/services/xrpl.utils';
import { SessionService } from 'src/app/state/session.service';
import { panic } from 'src/app/utils/errors/panic';
import { TransactionSigned, TransactionToSign } from 'src/schema/actions';
import * as xrpl from 'xrpl';
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
    const accountInfo = await this.xrplService.getAccountInfo({
      account: xrplAddress,
    });
    const xrplAccountRoot: xrpl.LedgerEntry.AccountRoot =
      accountInfo.result.account_data;

    // Get balances:
    const xrplBalances: XrplBalance[] = await this.xrplService.getBalances(
      xrplAddress
    );

    this.sessionStore.update({ xrplAccountRoot, xrplBalances });
  }

  async sendFunds(
    receiverId: string,
    amount: xrpl.Payment['Amount']
  ): Promise<xrpl.TxResponse> {
    const { wallet } = this.sessionQuery.assumeActiveSession();

    const preparedTx: xrpl.Payment =
      await this.xrplService.createUnsignedTransaction(
        wallet.xrpl_account.address_base58,
        receiverId,
        amount
      );

    return await this.sendTransaction(preparedTx);
  }

  /**
   * Helper: Sign, submit, and confirm the given transaction.
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
      console.log('SessionXrplService.sendTransaction:', { signed });
      const { signature_bytes } = signed.XrplTransactionSigned;

      const { txnSigned, txnSignedEncoded } = txnAfterSign(
        txnBeingSigned,
        uint8ArrayToHex(signature_bytes)
      );
      console.log('SessionXrplService.sendTransaction: after sign:', {
        txnSigned,
        txnSignedEncoded,
      });

      const txResponse: xrpl.TxResponse =
        await this.xrplService.submitAndWaitForSigned(txnSignedEncoded);
      console.log('SessionXrplService.sendTransaction', { txResponse });

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
