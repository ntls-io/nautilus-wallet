pub use hkdf::hmac::{Hmac, Mac};
use hkdf::Hkdf;
pub use secrecy::{self, zeroize, ExposeSecret, Secret, SecretBox, SecretString, SecretVec};
pub use sha2::{Digest, Sha256};
pub use zeroize::{Zeroize, ZeroizeOnDrop};

pub use crate::schema::types::Bytes;

pub type Bytes32 = [u8; 32];
pub type SecretBytes32 = Secret<Bytes32>;

/// A general context type
pub type Context = Bytes32;
/// A Diffie-Hellman specific context type
pub type DhContext = Bytes32;

pub type HkdfSha256 = Hkdf<Sha256>;
pub type HmacSha256 = Hmac<Sha256>;

pub type PublicKey = Bytes32;
pub type SecretKey = SecretBytes32;
pub type SharedSecret = SecretBytes32;

#[derive(Clone, Debug)]
pub struct KeyPair {
    pub pk: PublicKey,
    pub sk: SecretKey,
}

/// Comput a Sha256 digest whenever an input message is longer than 32 bytes
pub fn hash_when_too_long(msg: &[u8]) -> [u8; 32] {
    if msg.len() > 32 {
        let mut hasher = Sha256::new();
        hasher.update(msg);
        hasher.finalize().into()
    } else {
        let mut buf = <[u8; 32]>::default();
        buf.copy_from_slice(msg);
        buf
    }
}

/// Expands to fill an output buffer with a derived secret
/*
 * FIXME(panic): assumes output buffer is no more than 255 times the length of a
 * SHA-256 digest
 */
pub fn hkdf_expand(hkdf: &HkdfSha256, okm: &mut [u8;32]) {
    match hkdf.expand(&[], okm) {
        Ok(()) => (),
        Err(hkdf::InvalidLength) => panic!("Output buffer has fixed size of 32 bytes, well within the valid range."),
    };
}
