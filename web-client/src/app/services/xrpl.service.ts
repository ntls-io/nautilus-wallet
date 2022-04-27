import { Injectable } from '@angular/core';
import { defined } from 'src/app/utils/errors/panic';
import { environment } from 'src/environments/environment';
import * as xrpl from 'xrpl';

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
  protected xrplClient: xrpl.Client;

  constructor() {
    this.xrplClient = getXrplClientFromEnvironment();
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
   * Wrap {@link xrpl.Client.getBalances}.
   *
   * @see https://js.xrpl.org/classes/Client.html#getBalances
   */
  async getBalances(address: string): Promise<Balance[]> {
    return await this.withConnection(
      async (client) => await client.getBalances(address)
    );
  }

  async createUnsignedTransaction(
    fromAddress: string,
    toAddress: string,
    amount: xrpl.Payment['Amount']
  ): Promise<xrpl.Payment> {
    const unpreparedTx: xrpl.Payment = {
      Account: fromAddress,
      TransactionType: 'Payment',
      Amount: amount,
      Destination: toAddress,
    };
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

  /** Run `f` with a connected {@link xrpl.Client}. */
  protected async withConnection<T>(
    f: (client: xrpl.Client) => Promise<T>
  ): Promise<T> {
    await this.xrplClient.connect();
    try {
      return await f(this.xrplClient);
    } finally {
      await this.xrplClient.disconnect();
    }
  }
}

export type Balance = {
  value: string;
  currency: string;
  issuer?: string;
};

const getXrplClientFromEnvironment = (): xrpl.Client => {
  const { server, options } = defined(
    environment.xrplClient,
    'environment.xrplClient not configured'
  );
  return new xrpl.Client(server, options);
};
