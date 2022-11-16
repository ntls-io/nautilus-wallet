import { Injectable } from '@angular/core';
import { Transaction } from 'algosdk';
import { AlgodService } from 'src/app/services/algod.service';
import {
  Algos,
  Asset,
  AssetParams,
  convertToMicroAlgos,
  TransactionConfirmation,
} from 'src/app/services/algosdk.utils';
import { EnclaveService } from 'src/app/services/enclave/index';
import { SessionService } from 'src/app/state/session.service';
import { withLoggedExchange } from 'src/app/utils/console.helpers';
import { panic } from 'src/app/utils/errors/panic';
import { never } from 'src/helpers/helpers';
import {
  SignTransaction,
  SignTransactionResult,
  TransactionSigned,
  TransactionToSign,
} from 'src/schema/actions';
import { SessionQuery } from './session.query';
import { SessionStore } from './session.store';

/**
 * This service manages session state and operations related to the Algorand ledger.
 */
@Injectable({ providedIn: 'root' })
export class SessionAlgorandService {
  constructor(
    private sessionStore: SessionStore,
    private sessionQuery: SessionQuery,
    private sessionService: SessionService,
    private enclaveService: EnclaveService,
    private algodService: AlgodService
  ) {}

  /**
   * Load the current wallet's Algorand account status from {@link AlgodService}.
   *
   * This updates {@link SessionState#algorandAccountData}.
   */
  async loadAccountData(): Promise<void> {
    const { wallet } = this.sessionQuery.assumeActiveSession();
    const algorandAccountData = await this.algodService.getAccountData(
      wallet.algorand_address_base32
    );
    this.sessionStore.update({ algorandAccountData });
  }

  /**
   * Load the current wallet's asset holdings' parameters.
   *
   * This updates {@link SessionState.algorandAssetParams}.
   */
  async loadAssetParams(): Promise<void> {
    const assetHoldings = this.sessionQuery.getAlgorandAssetHoldings();
    if (assetHoldings) {
      const assets: Asset[] = await Promise.all(
        assetHoldings.map(
          (assetHolding): Promise<Asset> =>
            this.algodService.getAsset(assetHolding['asset-id'])
        )
      );
      const algorandAssetParams: Record<number, AssetParams> =
        Object.fromEntries(assets.map(({ index, params }) => [index, params]));
      this.sessionStore.update({ algorandAssetParams });
    }
  }

  /**
   * Send Algos to another account.
   */
  async sendAlgos(
    receiverId: string,
    amountInAlgos: Algos
  ): Promise<TransactionConfirmation> {
    const { wallet } = this.sessionQuery.assumeActiveSession();

    const amountInMicroAlgos = convertToMicroAlgos(amountInAlgos);
    const transaction = await this.algodService.createUnsignedTransaction({
      amount: amountInMicroAlgos,
      from: wallet.algorand_address_base32,
      to: receiverId,
    });
    return await this.sendTransaction(transaction);
  }

  async sendAssetOptIn(assetId: number): Promise<TransactionConfirmation> {
    const { wallet } = this.sessionQuery.assumeActiveSession();
    const transaction = await this.algodService.createUnsignedAssetOptInTxn(
      wallet.algorand_address_base32,
      assetId
    );
    return await this.sendTransaction(transaction);
  }

  async sendAssetFunds(
    assetId: number,
    receiverId: string,
    amount: number
  ): Promise<TransactionConfirmation> {
    const { wallet } = this.sessionQuery.assumeActiveSession();
    const transaction = await this.algodService.createUnsignedAssetTransferTxn({
      from: wallet.algorand_address_base32,
      to: receiverId,
      amount,
      assetIndex: assetId,
    });
    return await this.sendTransaction(transaction);
  }

  /**
   * Sign a transaction using the active session's wallet.
   *
   * This takes care of wrapping {@link SignTransaction}
   * and unwrapping {@link SignTransactionResult}.
   *
   * @see EnclaveService#signTransaction
   */
  async signTransaction(
    transaction_to_sign: TransactionToSign
  ): Promise<TransactionSigned> {
    const { wallet, pin } = this.sessionQuery.assumeActiveSession();

    const signRequest: SignTransaction = {
      auth_pin: pin,
      wallet_id: wallet.wallet_id,
      transaction_to_sign,
    };
    const signResult: SignTransactionResult = await withLoggedExchange(
      'SessionService: EnclaveService.signTransaction:',
      async () => await this.enclaveService.signTransaction(signRequest),
      signRequest
    );

    if ('Signed' in signResult) {
      return signResult.Signed;
    } else if ('InvalidAuth' in signResult) {
      this.sessionStore.setError({ signResult });
      throw panic('SessionService.signTransaction: invalid auth', signResult);
    } else if ('Failed' in signResult) {
      this.sessionStore.setError({ signResult });
      throw panic(
        `SessionService.signTransaction failed: ${signResult.Failed}`,
        signResult
      );
    } else {
      throw never(signResult);
    }
  }

  /**
   * Helper: Sign, submit, and confirm the given transaction.
   */
  protected async sendTransaction(
    transaction: Transaction
  ): Promise<TransactionConfirmation> {
    const unsigned: TransactionToSign = {
      AlgorandTransaction: { transaction_bytes: transaction.bytesToSign() },
    };
    const signed: TransactionSigned = await this.signTransaction(unsigned);

    if ('AlgorandTransactionSigned' in signed) {
      console.log('SessionAlgorandService.sendTransaction:', { signed });
      const { signed_transaction_bytes } = signed.AlgorandTransactionSigned;
      const confirmation = await this.algodService.submitAndConfirmTransaction(
        signed_transaction_bytes
      );
      console.log('SessionAlgorandService.sendTransaction:', { confirmation });

      await this.loadAccountData(); // FIXME(Pi): Move to caller?

      return confirmation;
    } else {
      throw panic(
        'SessionAlgorandService.sendTransaction: expected AlgorandTransactionSigned, got:',
        signed
      );
    }
  }
}
