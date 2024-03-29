import { Injectable } from '@angular/core';
import { CapacitorHttp } from '@capacitor/core';
import { NavController } from '@ionic/angular';
import { firstValueFrom } from 'rxjs';
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
import { createUrlWith } from 'src/app/utils/http.helpers';
import { parseNumber } from 'src/app/utils/validators';
import { ifDefined } from 'src/helpers/helpers';
import { TransactionSigned, TransactionToSign } from 'src/schema/actions';
import * as xrpl from 'xrpl';
import { IssuedCurrencyAmount } from 'xrpl/dist/npm/models/common';
import { Trustline } from 'xrpl/dist/npm/models/methods/accountLines';
import { SwalHelper } from '../utils/notification/swal-helper';
import { ConnectorQuery } from './connector';
import { SessionQuery } from './session.query';
import { SessionStore, XrplBalance } from './session.store';

const headers = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
};

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
    private xrplService: XrplService,
    private connectorQuery: ConnectorQuery,
    private navCtrl: NavController,
    private notification: SwalHelper
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
    amount: xrpl.Payment['Amount'],
    senderId?: string,
    senderPin?: string
  ): Promise<xrpl.TxResponse> {
    const preparedTx: xrpl.Payment = await this.prepareUnsignedTransaction(
      receiverId,
      amount,
      senderId
    );

    const txResponse = await this.sendTransaction(
      preparedTx,
      senderId,
      senderPin
    );
    await this.loadAccountData();
    return txResponse;
  }

  // Prepare transaction to autoload a new wallet with funds
  async sendAutoFunds(wallet_id: string) {
    if (wallet_id) {
      return await CapacitorHttp.post({
        headers,
        url: createUrlWith('wallet/autofund'),
        params: { wallet_id },
      })
        .then(({ status }) => {
          if (status === 201) {
            return true;
          }
        })
        .catch((error) => {
          console.log(error);
          throw error;
        });
    }
  }

  async sendFundsCommissioned(
    receiverId: string,
    mainAmount: xrpl.Payment['Amount'],
    commissionAmount: xrpl.Payment['Amount'],
    senderId?: string,
    senderPin?: string
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
      mainAmount,
      senderId
    );
    let wallet_hex_key;
    if (senderId) {
      wallet_hex_key = await this.sessionService.getXrplWalletPublicKey(
        senderId
      );
    }
    const signedMainTxn = await this.signXrplTransaction(
      mainTxnUnsigned,
      wallet_hex_key,
      senderId,
      senderPin
    );

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
        commissionAmount,
        senderId
      );

    const signedCommissionTxn = await this.signXrplTransaction(
      commissionTxnUnsigned,
      wallet_hex_key,
      senderId,
      senderPin
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
    limitAmount: IssuedCurrencyAmount,
    flags?: number | xrpl.TrustSetFlagsInterface
  ): Promise<xrpl.TxResponse> {
    const { wallet } = this.sessionQuery.assumeActiveSession();

    const preparedTx: xrpl.TrustSet = await withLoggedExchange(
      'SessionXrplService.sendTrustSetTx: XrplService.createUnsignedTrustSetTx:',
      async () =>
        await this.xrplService.createUnsignedTrustSetTx(
          wallet.xrpl_account.address_base58,
          limitAmount,
          flags
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
    // for (const trustLine of trustLines) {
    //   ifDefined(await this.checkTrustlineOptIn(trustLine), (txResponse) =>
    //     txResponses.push(txResponse)
    //   );
    // }
    return txResponses;
  }

  /**
   * Helper: Check trustline opt-in for the given trust-line.
   *
   * This sends a `TrustSet` transaction matching the peer's limit
   * if the active session's wallet's limit is zero.
   *
   * This also sends a `TrustSet` transaction matching the peer's limit
   * if the active session's wallet's limit_peer is zero.
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

    const limit = parseNumber(trustline.limit);
    if (limit === undefined) {
      throw panic(
        'SessionXrplService.checkTrustlineOptIn: bad limit:',
        trustline
      );
    }

    if (trustline.limit_peer === '0' && 0 < limit) {
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
   * Helper: Create a trust line between active session's wallet and targeted account.
   *
   * This creates and sends a `TrustSet` transaction.
   *
   * @return the `TrustSet` response, or undefined
   */
  async createTrustline(
    limitAmount: IssuedCurrencyAmount,
    rippling: boolean
  ): Promise<xrpl.TxResponse | undefined> {
    if (rippling) {
      const enableRippling: xrpl.TrustSetFlagsInterface = {
        tfClearNoRipple: true,
      };
      return await withLoggedExchange(
        'SessionXrplService.createTrustline: sending TrustSet',
        async () => await this.sendTrustSetTx(limitAmount, enableRippling),
        limitAmount
      );
    }

    return await withLoggedExchange(
      'SessionXrplService.createTrustline: sending TrustSet',
      async () => await this.sendTrustSetTx(limitAmount),
      limitAmount
    );
  }

  /**
   * Default trustline opt-in for each of this account's trust lines.
   *
   * @return The responses to `TrustSet` transactions sent out (empty if none sent)
   * @see defaultTrustlineOptIn
   */
  async defaultTrustlineOptIns(): Promise<xrpl.TxResponse[]> {
    // TODO(Pi): Check for necessary owner reserves before sending.
    //           See: https://xrpl.org/reserves.html

    const trustLines =
      (await firstValueFrom(this.sessionQuery.xrplTrustlines)) ?? [];

    const txResponses: xrpl.TxResponse[] = [];
    for (const trustLine of trustLines) {
      ifDefined(await this.defaultTrustlineOptIn(trustLine), (txResponse) =>
        txResponses.push(txResponse)
      );
    }
    return txResponses;
  }

  /**
   * Helper: Default trustline opt-in for the given trust-line.
   *
   * This sends a `TrustSet` transaction defaulting the limit to zero.
   *
   * @return the `TrustSet` response, or undefined
   */
  async defaultTrustlineOptIn(
    trustline: Trustline
  ): Promise<xrpl.TxResponse | undefined> {
    const limit_peer = parseNumber(trustline.limit_peer);
    if (limit_peer === undefined) {
      throw panic(
        'SessionXrplService.defaultTrustlineOptIn: bad limit_peer:',
        trustline
      );
    }
    if (limit_peer !== 0) {
      throw panic(
        'SessionXrplService.defaultTrustlineOptIn: limit_peer is not zero:',
        trustline
      );
    }

    const limit = parseNumber(trustline.limit);
    if (limit === undefined) {
      throw panic(
        'SessionXrplService.defaultTrustlineOptIn: bad limit:',
        trustline
      );
    }

    if (0 < limit) {
      const limitAmount = {
        currency: trustline.currency,
        issuer: trustline.account,
        value: '0',
      };
      const defaultFlags: xrpl.TrustSetFlagsInterface = {
        tfSetNoRipple: true,
        tfClearFreeze: true,
      };
      return await withLoggedExchange(
        'SessionXrplService.defaultTrustlineOptIn: sending TrustSet',
        async () => await this.sendTrustSetTx(limitAmount, defaultFlags),
        limitAmount
      );
    }
  }

  protected async prepareUnsignedTransaction(
    receiverId: string,
    amount: xrpl.Payment['Amount'],
    sender?: string
  ): Promise<xrpl.Payment> {
    const senderId = sender
      ? sender
      : this.sessionQuery.assumeActiveSession().wallet.xrpl_account
          .address_base58;

    return withLoggedExchange(
      'SessionXrplService.sendFunds: XrplService.createUnsignedPaymentTransaction:',
      async () =>
        await this.xrplService.createUnsignedPaymentTransaction(
          senderId,
          receiverId,
          amount
        ),
      { from: senderId, to: receiverId, amount }
    );
  }

  protected async signXrplTransaction(
    txnUnsigned: xrpl.Transaction,
    public_key_hex?: string,
    wallet_id?: string,
    account_pin?: string
  ): Promise<string> {
    const { wallet } = this.sessionQuery.assumeActiveSession();

    const wallet_hex_key = public_key_hex
      ? public_key_hex
      : wallet.xrpl_account.public_key_hex;

    const { txnBeingSigned, bytesToSignEncoded } = txnBeforeSign(
      txnUnsigned,
      wallet_hex_key
      // wallet.xrpl_account.public_key_hex
    );

    const transactionToSign: TransactionToSign = {
      XrplTransaction: {
        transaction_bytes: hexToUint8Array(bytesToSignEncoded),
      },
    };

    try {
      const signed: TransactionSigned =
        await this.sessionService.signTransaction(
          transactionToSign,
          wallet_id,
          account_pin
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
    } catch (err) {
      if (
        err instanceof Error &&
        err.message.includes('SessionService.signTransaction: invalid auth')
      ) {
        await this.notification.swal
          .fire({
            icon: 'error',
            text: 'Invalid PIN',
          })
          .then(({ isConfirmed }) => {
            if (isConfirmed) {
              this.navCtrl.back();
            }
          });
        throw new Error('Local error:');
      } else {
        throw err;
      }
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
    txnUnsigned: xrpl.Transaction,
    sender?: string,
    account_pin?: string
  ): Promise<xrpl.TxResponse> {
    if (sender) {
      const public_key_hex = await this.sessionService.getXrplWalletPublicKey(
        sender
      );
      const txnSignedEncoded = await this.signXrplTransaction(
        txnUnsigned,
        public_key_hex,
        sender,
        account_pin
      );
      const txResponse = await this.submitTransaction(txnSignedEncoded);
      const txSucceeded = checkTxResponseSucceeded(txResponse);
      return txResponse;
    } else {
      const txnSignedEncoded = await this.signXrplTransaction(
        txnUnsigned,
        sender
      );
      const txResponse = await this.submitTransaction(txnSignedEncoded);
      const txSucceeded = checkTxResponseSucceeded(txResponse);
      return txResponse;
    }
  }
}
