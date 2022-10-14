use std::io;
use std::string::String;

use hkdf::hmac::{Hmac, Mac};
use sha2::Sha256;
use thiserror::Error;

use crate::crypto::common::*;
use crate::crypto::key_agreement::DiffieHellman;
use crate::crypto::sgx_get_key::SgxGetKey;
use crate::schema::types::WalletId;
use crate::wallet_operations::store::load_wallet;

type HmacSha256 = Hmac<Sha256>;

/// Validate a new message that pertains to a previously sent one, using
/// cryptographically established sessions with the enclave.
#[derive(Debug)] //core
pub struct Session {
    id: WalletId,
    keys: KeyPair,
    shared_secret: Option<SharedSecret>,
}

#[derive(Debug, Error)]
pub enum SessionError {
    #[error("Wallet id {0:?} is invalid")]
    InvalidWalletId(WalletId),
    #[error("I/O error encountered while loading wallet")]
    IoError(#[from] io::Error),
}

fn create_mac_context(key: PublicKey, info: &[u8]) -> HmacSha256 {
    let mut mac = HmacSha256::new_from_slice(&key).unwrap();
    mac.update(info);
    mac
}

impl Session {
    /// Generate a new wallet enclave session.
    pub fn new(wallet_id: &str, context: &[u8]) -> Result<Self, SessionError> {
        //TODO: error handling when serialization fails
        let wallet_bytes = serde_json::to_vec(
            &load_wallet(&wallet_id)?
                .ok_or(SessionError::InvalidWalletId(String::from(wallet_id)))?,
        )
        .expect("Failed to serialize wallet storable");

        let ctx = [wallet_bytes.as_slice(), context].concat();
        let get_key = SgxGetKey::new(&ctx);

        Ok(Self {
            id: String::from(wallet_id),
            keys: get_key.get_key(),
            shared_secret: None,
        })
    }

    /// Validate and authenticate a new message based on state generated in connection with a prior message.
    pub fn validate_new_msg(
        mut self,
        their_pk: &PublicKey,
        new_msg: &[u8],
        tag: &[u8],
    ) -> ValidateMsgResult {
        match self.shared_secret {
            None => {
                /*
                 * The DH context used here is simply the user's wallet id
                 */
                let key_agreement = DiffieHellman::new(self.keys, Some(self.id.as_bytes()));
                self.shared_secret = Some(key_agreement.diffie_hellman(their_pk));
            }
            Some(_) => (),
        }

        let mac = create_mac_context(
            *self
                .shared_secret
                .expect("Should contain a value")
                .expose_secret(),
            new_msg,
        );
        match mac.verify_slice(tag) {
            Ok(()) => ValidateMsgResult::Valid,
            _ => ValidateMsgResult::InvalidMsg,
        }
    }
}

/// Validation result.
///
/// Note that the internal session id check happens *before* validation of the
/// new message.
pub enum ValidateMsgResult {
    Valid,
    InvalidSessionId,
    InvalidMsg,
}
