import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { CreateWallet, CreateWalletResult } from '../schema/actions';
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
    const base = 'http://ntls-demo.registree.io';
    // const base = '/api';
    return this.http
      .get(base + '/enclave-report', { responseType: 'arraybuffer' })
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
    // const base = '/api';
    const base = 'http://ntls-demo.registree.io';

    // Note: HttpClient expects bytes as an ArrayBuffer, not Uint8Array,
    // so take care to convert between them correctly.
    return this.http
      .post(base + '/wallet-operation', bufferFromView(sealedMessageBytes), {
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
