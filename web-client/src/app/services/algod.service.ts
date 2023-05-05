import { Injectable } from '@angular/core';
import algosdk, { IntDecoding, Transaction } from 'algosdk';
import AlgodClient from 'algosdk/dist/types/client/v2/algod/algod';
import {
  AccountData,
  Asset,
  TransactionConfirmation,
  waitForConfirmation,
} from 'src/app/services/algosdk.utils';
import { defined } from 'src/app/utils/errors/panic';
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
    // TODO: Convert this DI-provided argument?
    this.algodClient = getAlgodClientFromEnvironment();
  }

  async getAccountData(address: string): Promise<AccountData> {
    const accountData = await this.algodClient.accountInformation(address).do();
    // FIXME(Pi): Unchecked cast; should be validated.
    return accountData as AccountData;
  }

  /**
   * @see https://developer.algorand.org/docs/rest-apis/algod/v2/#get-v2assetsasset-id
   */
  async getAsset(assetId: number): Promise<Asset> {
    const asset = await this.algodClient.getAssetByID(assetId).do();
    // FIXME(Pi): Unchecked cast; should be validated.
    return asset as Asset;
  }

  async createUnsignedTransaction(
    required: RequiredParameters,
    optional?: OptionalParameters
  ): Promise<Transaction> {
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

/**
 * Construct an {@link AlgodClient} from {@link environment.algod}.
 *
 * In particular, this enforces {@link IntDecoding.SAFE}: we don't currently accommodate `bigint` values.
 */
const getAlgodClientFromEnvironment = (): AlgodClient => {
  const algod = defined(environment.algod, 'environment.algod not configured');
  const client = new algosdk.Algodv2(algod.token, algod.baseServer, algod.port);
  client.setIntEncoding(IntDecoding.SAFE);
  return client;
};
