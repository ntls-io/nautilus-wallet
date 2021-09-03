import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import algosdk from 'algosdk';
import { environment } from 'src/environments/environment';
import {
  CreateWallet,
  CreateWalletResult,
  OpenWallet,
  OpenWalletResult,
  SignTransaction,
  SignTransactionResult,
} from '../../schema/actions';
import {
  makePaymentTxnHelper,
  OptionalParameters,
  RequiredParameters,
} from '../../schema/algorand.helpers';
import { AttestationReport } from '../../schema/attestation';
import { PublicKey, TweetNaClCrypto } from '../../schema/crypto';
import { from_msgpack_as } from '../../schema/msgpack';
import { seal_msgpack_as, unseal_msgpack_as } from '../../schema/sealing';
import { TransactionConfirmation, waitForConfirmation } from './algosdk.utils';

@Injectable({
  providedIn: 'root',
})
export class WalletService {
  constructor(private http: HttpClient) {}

  async getEnclaveReport(): Promise<AttestationReport> {
    const bytes = await this.walletApiGetBytes('enclave-report');
    return from_msgpack_as<AttestationReport>(bytes);
  }

  async getEnclavePublicKey(): Promise<PublicKey> {
    const report: AttestationReport = await this.getEnclaveReport();
    // XXX: msgpack returns Array<number>: coerce to Uint8Array for tweetnacl
    return new Uint8Array(report.enclave_public_key);
  }

  async createWallet(request: CreateWallet): Promise<CreateWalletResult> {
    const walletRequest = { CreateWallet: request };
    const response = await this.postSealedExchange<
      { CreateWallet: CreateWallet },
      { CreateWallet: CreateWalletResult }
    >(walletRequest);
    const { CreateWallet: result } = response;
    return result;
  }

  async openWallet(request: OpenWallet): Promise<OpenWalletResult> {
    const walletRequest = { OpenWallet: request };
    const response = await this.postSealedExchange<
      { OpenWallet: OpenWallet },
      { OpenWallet: OpenWalletResult }
    >(walletRequest);
    const { OpenWallet: result } = response;
    return result;
  }

  async signTransaction(
    request: SignTransaction
  ): Promise<SignTransactionResult> {
    const walletRequest = { SignTransaction: request };
    const response = await this.postSealedExchange<
      { SignTransaction: SignTransaction },
      { SignTransaction: SignTransactionResult }
    >(walletRequest);
    const { SignTransaction: result } = response;
    return result;
  }

  async getBalance(address: string): Promise<number> {
    const algodClient = this.getAlgodClient();
    const accountDetails = await algodClient.accountInformation(address).do();
    // https://developer.algorand.org/docs/reference/rest-apis/algod/v2/#account
    return accountDetails['amount'] as number;
  }

  // Algorand network interface functions:

  async createUnsignedTransaction(
    required: RequiredParameters,
    optional?: OptionalParameters
  ) {
    const algodClient = this.getAlgodClient();
    const suggestedParams = await algodClient.getTransactionParams().do();
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
    return await this.getAlgodClient().sendRawTransaction(signedTxn).do();
  }

  async waitForTransactionConfirmation(
    txId: string
  ): Promise<TransactionConfirmation> {
    // TODO: Report rejection and timeout in a way the UI can use.
    return waitForConfirmation(this.getAlgodClient(), txId, 4);
  }

  /** Combine {@link submitSignedTransaction} and {@link waitForTransactionConfirmation}. */
  async submitAndConfirmTransaction(
    signedTxn: Uint8Array
  ): Promise<TransactionConfirmation> {
    const { txId } = await this.submitSignedTransaction(signedTxn);
    return await this.waitForTransactionConfirmation(txId);
  }

  // HTTP helpers

  protected async walletApiGetBytes(path: string): Promise<Uint8Array> {
    const url = this.getWalletApiUrl(path);
    const arrayBuffer = await this.http
      .get(url, { responseType: 'arraybuffer' })
      .toPromise();
    return arrayViewFromBuffer(arrayBuffer);
  }

  protected async walletApiPostBytes(
    path: string,
    bytes: Uint8Array
  ): Promise<Uint8Array> {
    const url = this.getWalletApiUrl(path);
    const body = bufferFromArrayView(bytes);
    const arrayBuffer = await this.http
      .post(url, body, { responseType: 'arraybuffer' })
      .toPromise();
    return arrayViewFromBuffer(arrayBuffer);
  }

  protected async postSealedExchange<Request, Response>(
    request: Request
  ): Promise<Response> {
    const clientCrypto = TweetNaClCrypto.new();

    const enclavePublicKey = await this.getEnclavePublicKey();

    const sealedRequestBytes = seal_msgpack_as<Request>(
      request,
      enclavePublicKey,
      clientCrypto
    );
    const sealedResponseBytes = await this.walletApiPostBytes(
      'wallet-operation',
      sealedRequestBytes
    );
    const response = unseal_msgpack_as<Response>(
      sealedResponseBytes,
      clientCrypto
    );
    if (response !== null) {
      return response;
    } else {
      console.error('XXX unsealing failed:', { sealedResponseBytes });
      throw new Error('unsealing response failed!');
    }
  }

  // Configuration helpers:

  protected getWalletApiUrl(path: string): string {
    const nautilusBaseUrl = environment.nautilusWalletServer;
    if (nautilusBaseUrl === undefined) {
      throw new Error('environment.algod.token not configured');
    }
    return new URL(path, nautilusBaseUrl).toString();
  }

  protected getAlgodClient() {
    const algod = environment.algod;
    if (algod.token === undefined) {
      throw new Error('environment.algod.token not configured');
    }
    return new algosdk.Algodv2(algod.token, algod.baseServer, algod.port);
  }
}

// Convert bytes between typed array views and buffers.
//
// Note that these types are similar and closely related, but not interchangeable:
// code that expects an ArrayBuffer may fail if given a Uint8Array, and vice versa.
//
// Also, note that TypeScript's type system does not actually distinguish these two,
// so this code checks the types at run-time to avoid hard-to-diagnose errors.

export const arrayViewFromBuffer = (buffer: ArrayBuffer): Uint8Array => {
  if (!(buffer instanceof ArrayBuffer)) {
    throw new TypeError('expected ArrayBuffer');
  }
  return new Uint8Array(buffer);
};

export const bufferFromArrayView = (view: Uint8Array): ArrayBuffer => {
  if (!(view instanceof Uint8Array)) {
    throw new TypeError('expected Uint8Array');
  }
  const begin = view.byteOffset;
  const end = view.byteOffset + view.byteLength;
  return view.buffer.slice(begin, end);
};
