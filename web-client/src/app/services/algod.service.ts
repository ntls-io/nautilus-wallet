import { Injectable } from '@angular/core';
import algosdk, { Transaction } from 'algosdk';
import AlgodClient from 'algosdk/dist/types/src/client/v2/algod/algod';
import {
  AccountData,
  TransactionConfirmation,
  waitForConfirmation,
} from 'src/app/services/algosdk.utils';
import { environment } from 'src/environments/environment';
import {
  AssetTransferRequiredParameters,
  makeAssetTransferTxnHelper,
  makePaymentTxnHelper,
  OptionalParameters,
  RequiredParameters,
} from 'src/schema/algorand.helpers';

/**
 * This service wraps an instance of the algosdk {@link AlgodClient},
 * configured from {@link environment.algod}.
 *
 * Responsibilities:
 *
 * - Read account information
 * - Create, submit, and confirm transactions
 */
@Injectable({
  providedIn: 'root',
})
export class AlgodService {
  protected algodClient: AlgodClient;

  constructor() {
    this.algodClient = getAlgodClientFromEnvironment();
  }

  async getAccount(address: string): Promise<AccountData> {
    return (await this.algodClient
      .accountInformation(address)
      .do()) as AccountData;
  }

  async createUnsignedAssetTransferTxn(
    required: AssetTransferRequiredParameters,
    optional?: OptionalParameters
  ): Promise<Transaction> {
    const suggestedParams = await this.algodClient.getTransactionParams().do();
    return makeAssetTransferTxnHelper(suggestedParams, required, optional);
  }

  async createUnsignedAssetOptInTxn(
    address: string,
    assetIndex: number
  ): Promise<Transaction> {
    return await this.createUnsignedAssetTransferTxn({
      from: address,
      to: address,
      amount: 0,
      assetIndex,
    });
  }

  async createUnsignedTransaction(
    required: RequiredParameters,
    optional?: OptionalParameters
  ) {
    const suggestedParams = await this.algodClient.getTransactionParams().do();
    console.log('createUnsignedTransaction', 'got:', { suggestedParams });
    const transaction = makePaymentTxnHelper(
      suggestedParams,
      required,
      optional
    );
    console.log('createUnsignedTransaction', 'created:', { transaction });
    return transaction;
  }

  async submitSignedTransaction(
    signedTxn: Uint8Array
  ): Promise<{ txId: string }> {
    return await this.algodClient.sendRawTransaction(signedTxn).do();
  }

  async waitForTransactionConfirmation(
    txId: string
  ): Promise<TransactionConfirmation> {
    // TODO: Report rejection and timeout in a way the UI can use.
    return waitForConfirmation(this.algodClient, txId, 4);
  }

  /** Combine {@link submitSignedTransaction} and {@link waitForTransactionConfirmation}. */
  async submitAndConfirmTransaction(
    signedTxn: Uint8Array
  ): Promise<TransactionConfirmation> {
    const { txId } = await this.submitSignedTransaction(signedTxn);
    return await this.waitForTransactionConfirmation(txId);
  }
}

const getAlgodClientFromEnvironment = () => {
  const algod = environment.algod;
  if (algod.token === undefined) {
    throw new Error('environment.algod.token not configured');
  }
  return new algosdk.Algodv2(algod.token, algod.baseServer, algod.port);
};
