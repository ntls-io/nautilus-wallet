import { Injectable } from '@angular/core';
import algosdk from 'algosdk';
import AlgodClient from 'algosdk/dist/types/src/client/v2/algod/algod';
import {
  AccountData,
  TransactionConfirmation,
  waitForConfirmation,
} from 'src/app/services/algosdk.utils';
import { defined } from 'src/app/utils/errors/panic';
import { environment } from 'src/environments/environment';
import {
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
  const algod = defined(environment.algod, 'environment.algod not configured');
  return new algosdk.Algodv2(algod.token, algod.baseServer, algod.port);
};
