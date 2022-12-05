/**
 * Interface patterned after `SodaBoxCrypto` on the server, but implemented using TweetNaCl.
 */

import { HKDF } from '@stablelib/hkdf/lib/hkdf';
import { SHA256 } from '@stablelib/sha256/lib/sha256';
import { X25519KeyAgreement } from '@stablelib/x25519/lib/keyagreement';
import * as nacl from 'tweetnacl';
import { BoxKeyPair } from 'tweetnacl';
import { Bytes, Bytes24, Bytes32 } from './types';

export type PublicKey = Bytes32;
export type PrivateKey = Bytes32;
export type Nonce = Bytes24;

type EncryptedMessage = {
  ciphertext: Bytes32;
  nonce: Bytes24;
};

export class TweetNaClCrypto {
  constructor(public keyPair: BoxKeyPair) {}

  get public_key(): PublicKey {
    return this.keyPair.publicKey;
  }

  get secret_key(): PrivateKey {
    return this.keyPair.secretKey;
  }

  static new = (): TweetNaClCrypto => new TweetNaClCrypto(nacl.box.keyPair());

  decrypt_message = (
    ciphertext: Bytes32,
    their_pk: PublicKey,
    nonce: Nonce
  ): Uint8Array | null =>
    nacl.box.open(ciphertext, nonce, their_pk, this.secret_key);

  encrypt_message = (
    message: Bytes32,
    their_pk: PublicKey
  ): EncryptedMessage => {
    const nonce = nacl.randomBytes(nacl.box.nonceLength);
    const ciphertext = nacl.box(message, nonce, their_pk, this.secret_key);
    return { ciphertext, nonce };
  };
}

/**
 * A shared secret acquired via a DH key agreement
 */
export type SharedSecret = Bytes32;
/**
 * A seed used to instantiate a random number generator such as when generating
 * a random key pair.
 */
export type Seed = Bytes32;

/**
 * Hash a byte string that is (strictly) longer than 32 bytes.
 */
export const hashWhenTooLong = (msg: Bytes): Bytes32 => {
  if (msg.length > 32) {
    const hasher = new SHA256();
    hasher.update(msg);
    return hasher.digest();
  }
  return msg;
};

/**
 * Diffie-Hellman (DH) key agreement in order to establish shared secrets.
 *
 * This allows us to establish "session keys" for the authentication of
 * multi-step exchanges between the client and server.
 */

type KeyAgreementFinished = boolean;
export class DiffieHellman {
  protected finished: KeyAgreementFinished = false;
  protected hkdfSalt: Bytes = new Uint8Array(0);
  protected ourPk?: PublicKey;
  protected x25519: X25519KeyAgreement = new X25519KeyAgreement();

  constructor(context: Bytes = new Uint8Array(0), seed?: Seed) {
    this.hkdfSalt = hashWhenTooLong(context);
    this.x25519 = new X25519KeyAgreement(seed);
  }

  /**
   * Instantiate a new key agreement using a keypair generated from a seed.
   * Generally, this method should be avoided and `new` should be used in its
   * place.
   */
  static from_seed = (
    seed: Seed,
    salt: Bytes = new Uint8Array(0)
  ): DiffieHellman => new DiffieHellman(salt, seed);

  /**
   * Instantiate a new key agreement using a randomly generated keypair.
   */
  static new = (salt: Bytes = new Uint8Array(0)): DiffieHellman =>
    new DiffieHellman(salt);

  /**
   * Derive a new key pair and return the public key.  Otherwise, return a
   * previously cached public key.
   */
  x25519_public_key = (): PublicKey => {
    if (this.ourPk === undefined) {
      this.ourPk = this.x25519.offer();
    }
    return this.ourPk;
  };

  /**
   * Complete the ECDH operation in order to obtain a shared secret.
   *
   * See https://en.wikipedia.org/wiki/Elliptic-curve_Diffie%E2%80%93Hellman for
   * further details.
   */
  diffie_hellman = (
    their_pk: PublicKey,
    secret_length: number = 32
  ): SharedSecret => {
    this.finish(their_pk);
    const raw_shared_key: SharedSecret = this.x25519.getSharedKey();

    /*
     * RFC 7748 recommends applying a KDF to the raw shared key.
     *
     * Refer to https://en.wikipedia.org/wiki/Key_derivation_function for
     * further details.
     */
    const hkdf = new HKDF(SHA256, raw_shared_key, this.hkdfSalt);
    return hkdf.expand(secret_length);
  };

  protected finish = (their_pk: PublicKey): void => {
    if (!this.finished) {
      this.x25519 = this.x25519.finish(their_pk);
    }
  };
}
