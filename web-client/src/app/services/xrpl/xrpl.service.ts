import { Injectable } from '@angular/core';
import binaryCodec from 'ripple-binary-codec';
import { RippleAPI, TransactionJSON } from 'ripple-lib';
import { Payment } from 'ripple-lib/dist/npm/transaction/payment';
import { FormattedSubmitResponse } from 'ripple-lib/dist/npm/transaction/submit';

@Injectable({
  providedIn: 'root',
})
export class XrplService {
  api: RippleAPI;

  constructor() {
    this.api = new RippleAPI({
      server: 'wss://s.altnet.rippletest.net:51233/',
    });
  }

  // For Reference: https://github.com/XRPLF/xrpl.js/blob/6e4868e6c7a03f0d48de1ddee5d9a88700ab5a7c/src/transaction/sign.ts#L29
  async createUnsignedTransaction(
    fromAddress: string,
    toAddress: string,
    amount: string,
    // From the server when we open the wallet
    publicKey: string
  ): Promise<{ encoded: string; txJSON: TransactionJSON }> {
    const amountDrops = {
      value: this.api.xrpToDrops(amount),
      currency: 'drops',
    };
    const payment: Payment = {
      source: { address: fromAddress, amount: amountDrops },
      destination: { address: toAddress, minAmount: amountDrops },
    };

    // TODO: Connection tied to the service lifetime instead?
    await this.api.connect();
    // TODO: allow longer time for transaction submission
    const { txJSON } = await this.api.preparePayment(fromAddress, payment);
    await this.api.disconnect();

    console.log(txJSON);

    const tx: TransactionJSON = JSON.parse(txJSON);

    const txToSignAndEncode: TransactionJSON = {
      ...tx,
      SigningPubKey: publicKey,
    };

    return {
      encoded: binaryCodec.encodeForSigning(txToSignAndEncode),
      txJSON: txToSignAndEncode,
    };
  }

  // For Reference: https://github.com/XRPLF/xrpl.js/blob/6e4868e6c7a03f0d48de1ddee5d9a88700ab5a7c/src/transaction/sign.ts#L54
  async submitTransaction(
    tx: TransactionJSON,
    signature: string
  ): Promise<FormattedSubmitResponse> {
    const signedTx: TransactionJSON = { ...tx, TxnSignature: signature };

    const encodedTx = binaryCodec.encode(signedTx);

    await this.api.connect();
    const res = await this.api.submit(encodedTx);
    await this.api.disconnect();

    if (res.resultCode !== 'tesSUCCESS') {
      throw new Error('');
    } else {
      console.log(res);
      return res;
    }
  }
}
