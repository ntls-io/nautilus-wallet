/**
 * Simple session support for the wallet enclave.
 *
 * For functionality that requires multiple exchanges between the client and
 * enclave, it is necessary to establish a session cryptographically linking
 * these exchanges together.
 */

import { HMAC } from '@stablelib/hmac/lib/hmac';
import { SHA256 } from '@stablelib/sha256/lib/sha256';
import { DiffieHellman, PublicKey, SharedSecret } from './crypto';
import { Bytes, Bytes32, WalletId } from './types';

export class StartSgxSession {
  protected context: Bytes;

  protected constructor(wallet_id: WalletId, ctx: Bytes = new Uint8Array(0)) {
    /*
     * Concatenate wallet id and supplied context into a combined context
     */
    const wallet_id_bytes = new TextEncoder().encode(wallet_id);
    this.context = new Uint8Array(wallet_id_bytes.length + ctx.length);
    this.context.set(wallet_id_bytes);
    this.context.set(ctx, ctx.length);
  }

  static new = (wallet_id: WalletId, context?: Bytes): StartSgxSession =>
    new StartSgxSession(wallet_id, context);

  /**
   * Configure the session with a public key received from the enclave. This
   * method needs to be called before computing any MACs.
   */
  start_session = (their_pk: PublicKey): SgxSession => {
    const dh = DiffieHellman.new(this.context);
    return new SgxSession(dh, their_pk);
  };
}

export class SgxSession {
  readonly ourPk: PublicKey;
  private readonly secret: SharedSecret;

  constructor(protected dh: DiffieHellman, readonly theirPk: PublicKey) {
    this.secret = dh.diffie_hellman(theirPk);
    this.ourPk = dh.x25519_public_key();
  }

  /**
   * Compute and return a message authentication code for an input message.
   */
  message_authentication_code = (msg: Bytes): Bytes32 => {
    const hmac = new HMAC(SHA256, this.secret);
    hmac.update(msg);
    return hmac.digest();
  };
}
