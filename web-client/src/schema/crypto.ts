/**
 * Interface patterned after `SodaBoxCrypto` on the server, but implemented using TweetNaCl.
 */

import * as nacl from 'tweetnacl';
import { BoxKeyPair } from 'tweetnacl';
import { Bytes, Bytes24, Bytes32 } from './types';

export type PublicKey = Bytes32;
export type PrivateKey = Bytes32;
export type Nonce = Bytes24;

type EncryptedMessage = {
  ciphertext: Bytes;
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
    ciphertext: Bytes,
    their_pk: PublicKey,
    nonce: Nonce
  ): Uint8Array | null =>
    nacl.box.open(ciphertext, nonce, their_pk, this.secret_key);

  encrypt_message = (message: Bytes, their_pk: PublicKey): EncryptedMessage => {
    const nonce = nacl.randomBytes(nacl.box.nonceLength);
    const ciphertext = nacl.box(message, nonce, their_pk, this.secret_key);
    return { ciphertext, nonce };
  };
}
