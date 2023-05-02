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
  protected x25519: DiffieHellman;

  protected constructor(wallet_id: WalletId) {
    /*
     * Concatenate wallet id and supplied context into a combined context
     */
    this.context = new TextEncoder().encode(wallet_id);
    this.x25519 = DiffieHellman.new(this.context);
  }

  static new = (wallet_id: WalletId): StartSgxSession =>
    new StartSgxSession(wallet_id);

  /**
   * Add on additional context
   */
  add_context = (ctx: Bytes): StartSgxSession => {
    const oldCtx = this.context;
    this.context = new Uint8Array(oldCtx.length + ctx.length);
    this.context.set(oldCtx);
    this.context.set(ctx, ctx.length);
    return this;
  };

  /**
   * The client public key.
   */
  our_public_key = (): Bytes32 => this.x25519.x25519_public_key();

  /**
   * Configure the session with a public key received from the enclave. This
   * method needs to be called before computing any MACs.
   */
  start_session = (their_pk: PublicKey): SgxSession =>
    new SgxSession(this.x25519, their_pk);
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

  string_to_mac = (msg_text: string): Bytes32 => {
    const msg = new TextEncoder().encode(msg_text);
    return this.message_authentication_code(msg);
  };
}
