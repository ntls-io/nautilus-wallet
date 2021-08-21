import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import algosdk from 'algosdk';
import { Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import {
  CreateWallet,
  CreateWalletResult,
  OpenWallet,
  OpenWalletResult,
  SignTransaction,
  SignTransactionResult,
} from '../schema/actions';
import {
  makePaymentTxnHelper,
  OptionalParameters,
  RequiredParameters,
} from '../schema/algorand.helpers';
import { AttestationReport } from '../schema/attestation';
import { PublicKey, TweetNaClCrypto } from '../schema/crypto';
import { from_msgpack_as } from '../schema/msgpack';
import { seal_msgpack_as, unseal_msgpack_as } from '../schema/sealing';
import { Bytes } from '../schema/types';

/* eslint-disable @typescript-eslint/naming-convention */

@Injectable({
  providedIn: 'root',
})
export class WalletService {
  constructor(private http: HttpClient) {}

  getEnclaveReport(): Observable<AttestationReport> {
    const url = this.getNautilusBaseUrl() + '/enclave-report';
    return this.http
      .get(url, { responseType: 'arraybuffer' })
      .pipe(
        map((arrayBuffer) =>
          from_msgpack_as<AttestationReport>(new Uint8Array(arrayBuffer))
        )
      );
  }

  getEnclavePublicKey(): Observable<PublicKey> {
    return this.getEnclaveReport().pipe(
      map(
        (report) =>
          // XXX: Explicitly coerce to Uint8Array.
          // (msgpack returns Array, which tweetnacl doesn't like)
          new Uint8Array(report.enclave_public_key)
      )
    );
  }

  postWalletOperationBytes(sealedMessageBytes: Bytes): Observable<Bytes> {
    const url = this.getNautilusBaseUrl() + '/wallet-operation';

    // Note: HttpClient expects bytes as an ArrayBuffer, not Uint8Array,
    // so take care to convert between them correctly.
    return this.http
      .post(url, bufferFromView(sealedMessageBytes), {
        responseType: 'arraybuffer',
      })
      .pipe(map((arrayBuffer) => viewFromBuffer(arrayBuffer)));
  }

  postSealedExchange<Request, Response>(
    request: Request
  ): Observable<Response> {
    const clientCrypto = TweetNaClCrypto.new();
    return this.getEnclavePublicKey().pipe(
      mergeMap((enclavePublicKey) => {
        const sealedRequestBytes = seal_msgpack_as<Request>(
          request,
          enclavePublicKey,
          clientCrypto
        );
        return this.postWalletOperationBytes(sealedRequestBytes).pipe(
          map((sealedResponseBytes): Response => {
            const response = unseal_msgpack_as<Response>(
              sealedResponseBytes,
              clientCrypto
            );
            if (response !== null) {
              return response;
            } else {
              throw new Error('unsealing response failed!');
            }
          })
        );
      })
    );
  }

  createWallet(request: CreateWallet): Observable<CreateWalletResult> {
    const walletRequest = { CreateWallet: request };
    return this.postSealedExchange<
      { CreateWallet: CreateWallet },
      { CreateWallet: CreateWalletResult }
    >(walletRequest).pipe(
      map((response) => {
        console.log('XXX createWallet response:', response);
        const { CreateWallet: result } = response;
        return result;
      })
    );
  }

  openWallet(request: OpenWallet): Observable<OpenWalletResult> {
    const walletRequest = { OpenWallet: request };
    return this.postSealedExchange<
      { OpenWallet: OpenWallet },
      { OpenWallet: OpenWalletResult }
    >(walletRequest).pipe(
      map((response) => {
        const { OpenWallet: result } = response;
        return result;
      })
    );
  }

  signTransaction(request: SignTransaction): Observable<SignTransactionResult> {
    const walletRequest = { SignTransaction: request };
    return this.postSealedExchange<
      { SignTransaction: SignTransaction },
      { SignTransaction: SignTransactionResult }
    >(walletRequest).pipe(
      map((response) => {
        const { SignTransaction: result } = response;
        return result;
      })
    );
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

  // Configuration helpers:

  protected getNautilusBaseUrl(): string {
    const nautilusBaseUrl = environment.nautilusBaseUrl;
    if (nautilusBaseUrl === undefined) {
      throw new Error('environment.algod.token not configured');
    }
    return nautilusBaseUrl;
  }

  protected getAlgodClient() {
    const algod = environment.algod;
    console.log('getAlgodClient', { algod });
    if (algod.token === undefined) {
      throw new Error('environment.algod.token not configured');
    }
    return new algosdk.Algodv2(algod.token, algod.baseServer, algod.port);
  }
}

// Convert bytes between typed array views and buffers.
//
// HttpClient works with ArrayBuffer, but the surrounding code works with Uint8Array,
// and they can't be used interchangeably.
//
// Also, note that TypeScript's type system does not actually distinguish these two,
// so this code does run-time checks to avoid hard-to-diagnose errors.

const viewFromBuffer = (buffer: ArrayBuffer): Uint8Array => {
  if (!(buffer instanceof ArrayBuffer)) {
    throw new TypeError(`expected ArrayBuffer`);
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
