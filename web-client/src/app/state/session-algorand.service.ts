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
import { SessionService } from 'src/app/state/session.service';
import { panic } from 'src/app/utils/errors/panic';
import { TransactionSigned, TransactionToSign } from 'src/schema/actions';
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
   * Helper: Sign, submit, and confirm the given transaction.
   */
  protected async sendTransaction(
    transaction: Transaction
  ): Promise<TransactionConfirmation> {
    const unsigned: TransactionToSign = {
      AlgorandTransaction: { transaction_bytes: transaction.bytesToSign() },
    };
    const signed: TransactionSigned = await this.sessionService.signTransaction(
      unsigned
    );

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
