/** [`SealedMessage`] sealing and unsealing. */

import { Nonce, PublicKey, TweetNaClCrypto } from './crypto';
import { from_msgpack, from_msgpack_as, to_msgpack } from './msgpack';
import { Bytes } from './types';

/** A sealed message */
export type SealedMessage = {
  ciphertext: Bytes;
  nonce: Nonce;
  sender_public_key: PublicKey;
};

/** Seal message bytes from [`sender_crypto`] to [`receiver_public_key`]. */
export const seal = (
  message_bytes: Bytes,
  receiver_public_key: PublicKey,
  sender_crypto: TweetNaClCrypto
): SealedMessage => {
  const encrypted_message = sender_crypto.encrypt_message(
    message_bytes,
    receiver_public_key
  );
  return {
    ciphertext: encrypted_message.ciphertext,
    nonce: encrypted_message.nonce,
    sender_public_key: sender_crypto.public_key,
  };
};

/** Unseal message bytes to [`receiver_crypto`]. */
export const unseal = (
  sealed_message: SealedMessage,
  receiver_crypto: TweetNaClCrypto
): Uint8Array | null =>
  receiver_crypto.decrypt_message(
    sealed_message.ciphertext,
    sealed_message.sender_public_key,
    sealed_message.nonce
  );

// TODO: Better type handling.

/** [`seal`] as MessagePack. */
export const seal_msgpack = (
  message: unknown,
  receiver_public_key: PublicKey,
  sender_crypto: TweetNaClCrypto
): Bytes => {
  const message_bytes = to_msgpack(message);
  const sealed_message = seal(
    message_bytes,
    receiver_public_key,
    sender_crypto
  );
  return to_msgpack(sealed_message);
};

/** [`unseal`] as MessagePack. */
export const unseal_msgpack = (
  sealed_message_bytes: Bytes,
  receiver_crypto: TweetNaClCrypto
): unknown | null => {
  const sealed_message = from_msgpack_as<SealedMessage>(sealed_message_bytes);
  const message_bytes = unseal(sealed_message, receiver_crypto);
  if (message_bytes === null) {
    return null;
  }
  return from_msgpack(message_bytes);
};

// FIXME: Placeholder casts

export const seal_msgpack_as = <T>(
  message: T,
  receiver_public_key: PublicKey,
  sender_crypto: TweetNaClCrypto
): Bytes => seal_msgpack(message, receiver_public_key, sender_crypto);

export const unseal_msgpack_as = <T>(
  sealed_message_bytes: Bytes,
  receiver_crypto: TweetNaClCrypto
): T | null => unseal_msgpack(sealed_message_bytes, receiver_crypto) as T;
