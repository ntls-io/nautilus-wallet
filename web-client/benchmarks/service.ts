/**
 * XXX: This module is just a hack-and-slash port of WalletService onto Axios,
 *      for server benchmarking.
 */

/* eslint-disable @typescript-eslint/naming-convention */

import { default as algosdk } from 'algosdk';
import axios, { AxiosInstance } from 'axios';
import * as http from 'http';
import * as https from 'https';
import {
  CreateWallet,
  CreateWalletResult,
  OpenWallet,
  OpenWalletResult,
  SignTransaction,
  SignTransactionResult,
} from '../src/schema/actions';
import { makePaymentTxnHelper } from '../src/schema/algorand.helpers';
import { AttestationReport } from '../src/schema/attestation';
import { PublicKey, TweetNaClCrypto } from '../src/schema/crypto';
import { WalletDisplay } from '../src/schema/entities';
import { from_msgpack_as } from '../src/schema/msgpack';
import { seal_msgpack_as, unseal_msgpack_as } from '../src/schema/sealing';
import { Bytes, WalletId } from '../src/schema/types';

export class BenchmarkWalletService {
  walletAxiosInstance: AxiosInstance;
  cachedEnclavePublicKey: Uint8Array | null = null;

  constructor(nautilusBaseUrl: string) {
    this.walletAxiosInstance = axios.create({
      baseURL: nautilusBaseUrl,
      // headers: { 'Cache-Control': 'no-cache' },
      // timeout: 10000,
      validateStatus: (status) => status === 200,
      httpAgent: new http.Agent({ keepAlive: true }),
      httpsAgent: new https.Agent({ keepAlive: true }),
    });
  }

  // Helpers for explicitly working with a saved enclave public key:

  async saveEnclavePublicKey() {
    this.cachedEnclavePublicKey = await this.getEnclavePublicKey();
  }

  getSavedEnclavePublicKey(): PublicKey {
    if (this.cachedEnclavePublicKey) {
      return this.cachedEnclavePublicKey;
    } else {
      throw new Error('getSavedEnclavePublicKey: not saved!');
    }
  }

  async getEnclaveReport(): Promise<AttestationReport> {
    const response = await this.walletAxiosInstance.get<Buffer>(
      '/enclave-report',
      { responseType: 'arraybuffer' }
    );
    const arrayBuffer = response.data;
    return from_msgpack_as<AttestationReport>(new Uint8Array(arrayBuffer));
  }

  async getEnclavePublicKey(): Promise<PublicKey> {
    const report = await this.getEnclaveReport();
    // XXX: Explicitly coerce to Uint8Array.
    // (msgpack returns Array, which tweetnacl doesn't like)
    return new Uint8Array(report.enclave_public_key);
  }

  async postWalletOperationBytes(sealedMessageBytes: Bytes): Promise<Bytes> {
    const response = await this.walletAxiosInstance.post(
      '/wallet-operation',
      bufferFromView(sealedMessageBytes),
      {
        responseType: 'arraybuffer',
      }
    );
    const arrayBuffer = response.data;
    return viewFromBuffer(arrayBuffer);
  }

  async postSealedExchange<Request, Response>(
    request: Request
  ): Promise<Response> {
    const clientCrypto = TweetNaClCrypto.new();

    const enclavePublicKey = this.getSavedEnclavePublicKey();

    const sealedRequestBytes = seal_msgpack_as<Request>(
      request,
      enclavePublicKey,
      clientCrypto
    );
    const sealedResponseBytes = await this.postWalletOperationBytes(
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
}

// Convert bytes between typed array views and buffers.
//
// HttpClient works with ArrayBuffer, but the surrounding code works with Uint8Array,
// and they can't be used interchangeably.
//
// Also, note that TypeScript's type system does not actually distinguish these two,
// so this code does run-time checks to avoid hard-to-diagnose errors.

const viewFromBuffer = (buffer: Buffer): Uint8Array => {
  if (!(buffer instanceof Buffer)) {
    throw new TypeError(`expected Buffer`);
  }
  return new Uint8Array(buffer);
};

const bufferFromView = (view: Uint8Array): ArrayBuffer => {
  if (!(view instanceof Uint8Array)) {
    throw new TypeError(`expected Uint8Array`);
  }
  const begin = view.byteOffset;
  const end = view.byteOffset + view.byteLength;
  return view.buffer.slice(begin, end);
};

// Benchmark operation helpers:

export const doCreateWallet = async (
  service: BenchmarkWalletService,
  i: number
): Promise<void> => {
  const request: CreateWallet = {
    owner_name: `Test Owner ${i}`,
    auth_pin: '1234',
  };
  const result = await service.createWallet(request);
  if ('Created' in result) {
    const { Created: created } = result;
    if (created.owner_name === request.owner_name) {
    } else {
      console.error('doCreateWallet: unexpected owner', { request, created });
      throw new Error(
        'doCreateWallet: unexpected owner: ' + created.owner_name
      );
    }
  } else {
    console.error('doCreateWallet: failed:', result);
    throw new Error('doCreateWallet: failed: ' + result.Failed);
  }
};

export const prepareOpenWallet = async (
  service: BenchmarkWalletService
): Promise<WalletDisplay> => {
  const request: CreateWallet = {
    owner_name: 'Test OpenWallet',
    auth_pin: '1234',
  };
  const result = await service.createWallet(request);
  if ('Created' in result) {
    const { Created: created } = result;
    return created;
  } else {
    console.error('prepareOpenWallet: failed:', result);
    throw new Error('prepareOpenWallet: failed: ' + result.Failed);
  }
};

export const doOpenWallet = async (
  service: BenchmarkWalletService,
  wallet_id: WalletId
): Promise<void> => {
  const request: OpenWallet = {
    wallet_id,
    auth_pin: '1234',
  };
  const result = await service.openWallet(request);
  if ('Opened' in result) {
    const { Opened: opened } = result;
    if (opened.owner_name === 'Test OpenWallet') {
    } else {
      console.error('doOpenWallet: unexpected owner', { request, opened });
      throw new Error('doOpenWallet: unexpected owner: ' + opened.owner_name);
    }
  } else {
    console.error('doOpenWallet: failed:', result);
    throw new Error('doOpenWallet: failed: ' + result);
  }
};

export const prepareSignTransaction = async (
  service: BenchmarkWalletService
): Promise<SignTransaction> => {
  const algod = {
    baseServer: 'https://testnet-algorand.api.purestake.io/ps2',
    port: '',
    token: { 'X-API-Key': 'J7eo2jPb5m4OiBneIV6r0ajgRLeSaHqk3QplGETk' },
  };
  const algodClient = new algosdk.Algodv2(
    algod.token,
    algod.baseServer,
    algod.port
  );

  console.log('prepareSignTransaction: getting suggested Algorand params...');
  const suggestedParams = await algodClient.getTransactionParams().do();
  console.log('prepareSignTransaction: done.');

  const wallet = await prepareOpenWallet(service);
  const unsignedTransaction = makePaymentTxnHelper(suggestedParams, {
    from: wallet.algorand_address_base32,
    to: wallet.algorand_address_base32,
    amount: 1000,
  });
  const algorand_transaction_bytes = unsignedTransaction.bytesToSign();
  if (!(algorand_transaction_bytes instanceof Uint8Array)) {
    throw new TypeError(algorand_transaction_bytes);
  }

  return {
    wallet_id: wallet.wallet_id,
    auth_pin: '1234',
    algorand_transaction_bytes,
  };
};

export const doSignTransaction = async (
  service: BenchmarkWalletService,
  request: SignTransaction
): Promise<void> => {
  const result = await service.signTransaction(request);
  if ('Signed' in result) {
    const { Signed: signed } = result;
    const decodedSigned = algosdk.decodeSignedTransaction(
      signed.signed_transaction_bytes
    );
    if (decodedSigned.txn.amount === 1000) {
    } else {
      console.error('doSignTransaction: unexpected amount', {
        request,
        decodedSigned,
      });
      throw new Error(
        'doSignTransaction: unexpected amount: ' + decodedSigned.txn.amount
      );
    }
  } else {
    console.error('doSignTransaction: failed:', result);
    throw new Error('doSignTransaction: failed: ' + result);
  }
};
