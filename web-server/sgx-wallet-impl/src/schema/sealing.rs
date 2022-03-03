//! [`SealedMessage`] sealing and unsealing.

use std::error::Error;
use std::prelude::v1::Box;

use secrecy::{ExposeSecret, Secret};
use serde::{Deserialize, Serialize};
use zeroize::Zeroize;

use crate::ported::crypto::{CryptoError, Nonce, PublicKey, SecretBytes, SodaBoxCrypto};
use crate::schema::msgpack::{FromMessagePack, FromMessagePackOwned, ToMessagePack};
use crate::schema::serde_bytes_array;
use crate::schema::types::Bytes;

/// A sealed message
#[derive(Debug)] // core
#[derive(Deserialize, Serialize)] // serde
pub struct SealedMessage {
    #[serde(with = "serde_bytes")]
    pub ciphertext: Bytes,
    #[serde(with = "serde_bytes_array")]
    pub nonce: Nonce,
    #[serde(with = "serde_bytes_array")]
    pub sender_public_key: PublicKey,
}

/// Seal message bytes from `sender_crypto` to `receiver_public_key`.
pub fn seal(
    message_bytes: &SecretBytes,
    receiver_public_key: &PublicKey,
    sender_crypto: &mut SodaBoxCrypto,
) -> Result<SealedMessage, CryptoError> {
    let encrypted_message = sender_crypto.encrypt_message(message_bytes, receiver_public_key)?;
    Ok(SealedMessage {
        ciphertext: encrypted_message.ciphertext,
        nonce: encrypted_message.nonce,
        sender_public_key: sender_crypto.get_pubkey(),
    })
}

/// Unseal message bytes to `receiver_crypto`.
pub fn unseal(
    sealed_message: &SealedMessage,
    receiver_crypto: &SodaBoxCrypto,
) -> Result<SecretBytes, CryptoError> {
    let message_bytes = receiver_crypto.decrypt_message(
        &sealed_message.ciphertext,
        &sealed_message.sender_public_key,
        &sealed_message.nonce,
    )?;
    Ok(message_bytes)
}

/// [`seal] from the current enclave.
pub fn seal_from_enclave(
    message_bytes: &SecretBytes,
    receiver_public_key: &PublicKey,
) -> Result<SealedMessage, CryptoError> {
    let mut enclave_crypto = SodaBoxCrypto::new();
    seal(message_bytes, receiver_public_key, &mut enclave_crypto)
}

/// [`unseal`] to the current enclave.
pub fn unseal_to_enclave(sealed_message: &SealedMessage) -> Result<SecretBytes, CryptoError> {
    let enclave_crypto = &SodaBoxCrypto::new();
    unseal(sealed_message, enclave_crypto)
}

/// [`seal`] as MessagePack.
pub fn seal_msgpack<T>(
    message: &T,
    receiver_public_key: &PublicKey,
    sender_crypto: &mut SodaBoxCrypto,
) -> Result<Box<[u8]>, Box<dyn Error>>
where
    T: ToMessagePack,
{
    let message_bytes = &SecretBytes::new(message.to_msgpack()?);
    let sealed_message = seal(message_bytes, receiver_public_key, sender_crypto)?;
    let sealed_message_bytes = sealed_message.to_msgpack()?;
    Ok(sealed_message_bytes)
}

/// [`unseal`] as MessagePack.
pub fn unseal_msgpack<T>(
    sealed_message_bytes: &[u8],
    receiver_crypto: &SodaBoxCrypto,
) -> Result<Secret<T>, Box<dyn Error>>
where
    T: FromMessagePackOwned,
    T: Zeroize,
{
    let sealed_message = &SealedMessage::from_msgpack(sealed_message_bytes)?;
    let message_bytes = unseal(sealed_message, receiver_crypto)?;
    let message = Secret::new(T::from_msgpack_owned(message_bytes.expose_secret())?);
    Ok(message)
}
