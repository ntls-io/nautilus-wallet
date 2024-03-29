import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { withLoggedExchange } from 'src/app/utils/console.helpers';
import { environment } from 'src/environments/environment';
import {
  CreateWallet,
  CreateWalletResult,
  GetXrplWallet,
  GetXrplWalletResult,
  LoadOnfidoCheck,
  LoadOnfidoCheckResult,
  OpenWallet,
  OpenWalletResult,
  PinReset,
  PinResetResult,
  SaveOnfidoCheck,
  SaveOnfidoCheckResult,
  SignTransaction,
  SignTransactionResult,
  StartPinReset,
  StartPinResetResult,
  UpdateOtpPhoneNumber,
  UpdateOtpPhoneNumberResult,
} from 'src/schema/actions';
import { AttestationReport } from 'src/schema/attestation';
import { PublicKey, TweetNaClCrypto } from 'src/schema/crypto';
import { from_msgpack_as } from 'src/schema/msgpack';
import { seal_msgpack_as, unseal_msgpack_as } from 'src/schema/sealing';

/**
 * This service handles communication with the wallet enclave.
 */
@Injectable({
  providedIn: 'root',
})
export class EnclaveService {
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

  async getXrplWallet(request: GetXrplWallet): Promise<GetXrplWalletResult> {
    const walletRequest = { GetXrplWallet: request };
    const response = await this.postSealedExchange<
      { GetXrplWallet: GetXrplWallet },
      { GetXrplWallet: GetXrplWalletResult }
    >(walletRequest);
    const { GetXrplWallet: result } = response;
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

  async updateOtpPhoneNumber(
    request: UpdateOtpPhoneNumber
  ): Promise<UpdateOtpPhoneNumberResult> {
    const walletRequest = { UpdateOtpPhoneNumber: request };
    const response = await this.postSealedExchange<
      { UpdateOtpPhoneNumber: UpdateOtpPhoneNumber },
      { UpdateOtpPhoneNumber: UpdateOtpPhoneNumberResult }
    >(walletRequest);
    const { UpdateOtpPhoneNumber: result } = response;
    return result;
  }

  async startPinReset(request: StartPinReset): Promise<StartPinResetResult> {
    const walletRequest = { StartPinReset: request };
    const response = await this.postSealedExchange<
      { StartPinReset: StartPinReset },
      { StartPinReset: StartPinResetResult }
    >(walletRequest);
    const { StartPinReset: result } = response;
    return result;
  }

  async pinReset(request: PinReset): Promise<PinResetResult> {
    const walletRequest = { PinReset: request };
    const response = await this.postSealedExchange<
      { PinReset: PinReset },
      { PinReset: PinResetResult }
    >(walletRequest);
    const { PinReset: result } = response;
    return result;
  }

  async saveOnfidoCheck(
    request: SaveOnfidoCheck
  ): Promise<SaveOnfidoCheckResult> {
    const walletRequest = { SaveOnfidoCheck: request };
    const response = await this.postSealedExchange<
      { SaveOnfidoCheck: SaveOnfidoCheck },
      { SaveOnfidoCheck: SaveOnfidoCheckResult }
    >(walletRequest);
    const { SaveOnfidoCheck: result } = response;
    return result;
  }

  async loadOnfidoCheck(
    request: LoadOnfidoCheck
  ): Promise<LoadOnfidoCheckResult> {
    const walletRequest = { LoadOnfidoCheck: request };
    const response = await this.postSealedExchange<
      { LoadOnfidoCheck: LoadOnfidoCheck },
      { LoadOnfidoCheck: LoadOnfidoCheckResult }
    >(walletRequest);
    const { LoadOnfidoCheck: result } = response;
    return result;
  }

  // HTTP helpers

  protected async walletApiGetBytes(path: string): Promise<Uint8Array> {
    const url = this.getWalletApiUrl(path);
    const arrayBuffer = await lastValueFrom(
      this.http.get(url, {
        responseType: 'arraybuffer',
      })
    );
    return arrayViewFromBuffer(arrayBuffer);
  }

  protected async walletApiPostBytes(
    path: string,
    bytes: Uint8Array
  ): Promise<Uint8Array> {
    const url = this.getWalletApiUrl(path);
    const body = bufferFromArrayView(bytes);
    const arrayBuffer = await lastValueFrom(
      this.http.post(url, body, {
        responseType: 'arraybuffer',
      })
    );
    return arrayViewFromBuffer(arrayBuffer);
  }

  protected async postSealedExchange<Request, Response>(
    request: Request
  ): Promise<Response> {
    return withLoggedExchange(
      'EnclaveService.postSealedExchange:',
      () => this.postSealedExchangeInner(request),
      request
    );
  }

  protected async postSealedExchangeInner<Request, Response>(
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
    return new URL(path, environment.nautilusWalletServer).toString();
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
