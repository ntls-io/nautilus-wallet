use std::boxed::Box;

use sgx_types::{
    sgx_key_id_t,
    SGX_KEYPOLICY_MRENCLAVE,
    SGX_KEYPOLICY_MRSIGNER,
    SGX_KEYSELECT_SEAL,
};
use x25519_dalek::StaticSecret;

use super::common::*;
use crate::ported::crypto::sgx_get_key_helper;

#[derive(Clone, Eq, PartialEq, Debug)] // core
pub struct SgxGetKey {
    ctx: Context,
    salt: Option<Bytes>,
}

impl SgxGetKey {
    pub fn new(ctx: &[u8]) -> Self {
        Self {
            ctx: hash_when_too_long(ctx),
            salt: None,
        }
    }
    pub fn with_salt(ctx: &[u8], salt: &[u8]) -> Self {
        Self {
            ctx: hash_when_too_long(ctx),
            salt: Some(Box::from(salt)),
        }
    }
    #[must_use]
    pub fn get_key(self) -> KeyPair {
        let key_id = Some(sgx_key_id_t { id: self.ctx });
        let key_name = SGX_KEYSELECT_SEAL;
        // C-style bitflags:
        let key_policy = SGX_KEYPOLICY_MRENCLAVE | SGX_KEYPOLICY_MRSIGNER;

        let mut secret_key = <[u8; 32]>::default();
        let (left, right) = secret_key.split_at_mut(16);
        left.copy_from_slice(&sgx_get_key_helper(None, key_name, key_policy));
        right.copy_from_slice(&sgx_get_key_helper(key_id, key_name, key_policy));

        let mut output = <[u8; 32]>::default();
        let hkdf = self.salt.map_or_else(
            || HkdfSha256::new(None, &secret_key),
            |salt| HkdfSha256::new(Some(&salt), &secret_key),
        );
        hkdf_expand(&hkdf, &mut output);
        let x25519_secret = StaticSecret::from(output);
        KeyPair {
            sk: Secret::new(output),
            pk: x25519_dalek::PublicKey::from(&x25519_secret).to_bytes(),
        }
    }
}
