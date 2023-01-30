import { Injectable } from '@angular/core';
import { checkRippledErrorResponse } from 'src/app/services/xrpl.utils';
import { defined } from 'src/app/utils/errors/panic';
import * as xrpl from 'xrpl';
import { IssuedCurrencyAmount } from 'xrpl/dist/npm/models/common/index';
import { SetupQuery } from '../state/setup';

/**
 * This service wraps an instance of the algosdk {@link xrpl.Client},
 * configured from {@link environment.xrplClient}.
 *
 * Responsibilities:
 *
 * - Read account and balance information
 * - Create, submit, and confirm transactions
 */
@Injectable({
  providedIn: 'root',
})
export class XrplService {
  constructor(private setupQuery: SetupQuery) {
    // Call this once on construction as a smoke test.
    this.getClient();
  }

  /**
   * Ping the server, to test connectivity.
   *
   * @see https://xrpl.org/ping.html
   */
  async ping(): Promise<xrpl.PingResponse> {
    return this.withConnection(
      async (client) => await client.request({ command: 'ping' })
    );
  }

  /**
   * Retrieve information about an account, its activity, and its XRP balance.
   *
   * This call defaults to:
   *
   * - `ledger_index: 'validated'`
   * - `strict: true`
   *
   * @see https://xrpl.org/account_info.html
   */
  async getAccountInfo(
    request: Omit<xrpl.AccountInfoRequest, 'command'>
  ): Promise<xrpl.AccountInfoResponse> {
    return await this.withConnection(
      async (client) =>
        await client.request({
          ledger_index: 'validated',
          strict: true,
          ...request,
          command: 'account_info',
        })
    );
  }

  /**
   * Like {@link getAccountInfo}, but catch and return `undefined` for `actNotFound` errors.
   */
  async getAccountInfoIfExists(
    request: Omit<xrpl.AccountInfoRequest, 'command'>
  ): Promise<xrpl.AccountInfoResponse | undefined> {
    try {
      return await this.getAccountInfo(request);
    } catch (err) {
      const errorResponse: xrpl.ErrorResponse | undefined =
        checkRippledErrorResponse(err);
      if (errorResponse !== undefined) {
        // Docs: https://xrpl.org/account_info.html#possible-errors
        if (errorResponse.error === 'actNotFound') {
          return undefined;
        } else {
          console.log(
            'XrplService.getAccountInfoIfExists: unrecognised ErrorResponse:',
            { errorResponse }
          );
        }
      }
      throw err;
    }
  }

  /**
   * Retrieve information about an account's trust lines.
   *
   * This call defaults to:
   *
   * - `ledger_index: 'validated'`
   *
   * @see https://xrpl.org/account_lines.html
   */
  async getAccountLines(
    request: Omit<xrpl.AccountLinesRequest, 'command'>
  ): Promise<xrpl.AccountLinesResponse> {
    return await this.withConnection(
      async (client) =>
        await client.request({
          ledger_index: 'validated',
          ...request,
          command: 'account_lines',
        })
    );
  }

  /**
   * Wrap {@link xrpl.Client.getBalances}.
   *
   * @see https://js.xrpl.org/classes/Client.html#getBalances
   */
  async getBalances(address: string): Promise<Balance[]> {
    return await this.withConnection(
      async (client) => await client.getBalances(address)
    );
  }
  async createUnsignedPaymentTransaction(
    fromAddress: string,
    toAddress: string,
    amount: xrpl.Payment['Amount']
  ): Promise<xrpl.Payment> {
    const unpreparedTx: xrpl.Payment = {
      Account: fromAddress,
      TransactionType: 'Payment',
      Amount: amount,
      Destination: toAddress,
      DestinationTag: 0,
    };
    return await this.withConnection(
      async (client) => await client.autofill(unpreparedTx)
    );
  }

  async createUnsignedDeleteTransaction(
    fromAddress: string,
    toAddress: string
  ): Promise<xrpl.AccountDelete> {
    const unpreparedTx: xrpl.AccountDelete = {
      Account: fromAddress,
      TransactionType: 'AccountDelete',
      Destination: toAddress,
    };
    const tX = await this.withConnection(
      async (client) => await client.autofill(unpreparedTx)
    );
    return tX;
  }

  async createUnsignedTrustSetTx(
    fromAddress: string,
    limitAmount: IssuedCurrencyAmount,
    flags?: number | xrpl.TrustSetFlagsInterface
  ): Promise<xrpl.TrustSet> {
    const unpreparedTx: xrpl.TrustSet = {
      Account: fromAddress,
      TransactionType: 'TrustSet',
      LimitAmount: limitAmount,
    };
    if (typeof flags !== 'undefined') {
      unpreparedTx.Flags = flags;
    }

    return await this.withConnection(
      async (client) => await client.autofill(unpreparedTx)
    );
  }

  /**
   * Submit and wait for a signed transaction.
   *
   * @see https://js.xrpl.org/classes/Client.html#submitAndWait
   * @see https://xrpl.org/reliable-transaction-submission.html
   */
  async submitAndWaitForSigned(
    signedTxEncoded: string
  ): Promise<xrpl.TxResponse> {
    return await this.withConnection(
      async (client) => await client.submitAndWait(signedTxEncoded)
    );
  }

  /**
   * Retrieves a list of transactions that involved the specified account
   *
   * @see https://js.xrpl.org/interfaces/AccountTxRequest.html
   */
  async getAccountTx(account: string): Promise<xrpl.AccountTxResponse> {
    return await this.withConnection(
      async (client) =>
        await client.request({
          command: 'account_tx',
          account,
        })
    );
  }

  // For Reference: https://github.com/XRPLF/xrpl.js/blob/6e4868e6c7a03f0d48de1ddee5d9a88700ab5a7c/src/transaction/sign.ts#L54
  /*
  async submitTransaction(
    tx: TransactionJSON,
    signature: string
  ): Promise<FormattedSubmitResponse> {
    const signedTx: TransactionJSON = { ...tx, TxnSignature: signature };

    const encodedTx = binaryCodec.encode(signedTx);

    await this.xrplClient.connect();
    const res = await this.xrplClient.submit(encodedTx);
    await this.xrplClient.disconnect();

    if (res.resultCode !==  'tesSUCCESS') {
      throw new Error('');
    } else {
      console.log(res);
      return res;
    }
  }
*/

  /**
   * Run `f` with a connected {@link xrpl.Client}.
   *
   * In particular, this runs each request with a separate client instance,
   * to avoid state conflicts.
   */
  protected async withConnection<T>(
    f: (client: xrpl.Client) => Promise<T>
  ): Promise<T> {
    const xrplClient = this.getClient();
    try {
      await xrplClient.connect();
      return await f(xrplClient);
    } finally {
      await xrplClient.disconnect();
    }
  }

  protected getClient(): xrpl.Client {
    const xrplClient = this.setupQuery.ledger;
    const { server, options } = defined(
      xrplClient,
      'environment.xrplClient not configured'
    );
    return new xrpl.Client(server, options);
  }
}

export type Balance = {
  value: string;
  currency: string;
  issuer?: string;
};
