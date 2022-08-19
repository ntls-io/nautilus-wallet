use std::vec::Vec;

use hmac::{Hmac, Mac};
use rand::RngCore;
use secrecy::Zeroize;
use sgx_trts::memeq::ConsttimeMemEq;
use sha2::Sha512_256;
use zeroize::ZeroizeOnDrop;

use crate::schema::entities::SessionStorable;

type HmacSha512_256 = Hmac<Sha512_256>;

const SESSION_KEY_LENGTH: usize = 32;

/// Validate a new message that pertains to a previously sent one, using
/// cryptographically established sessions with the enclave.
///
/// Session state is generated using a keyed hash of the initial message, using
/// a randomly generated key. An internal session id, i.e. the aforementioned
/// hash, is checked *before* the message is validated.
#[derive(Clone, Eq, PartialEq, Debug)] //core
#[derive(Zeroize, ZeroizeOnDrop)] // zeroize
pub struct Session {
    pub id: Vec<u8>,
    pub key: Vec<u8>,
}

impl TryFrom<SessionStorable> for Session {
    type Error = base64::DecodeError;
    fn try_from(stored: SessionStorable) -> Result<Self, Self::Error> {
        Ok(Self {
            id: base64::decode(&stored.session_id)?,
            key: base64::decode(&stored.session_key)?,
        })
    }
}

fn create_mac_context(key: &[u8], msg: &[u8]) -> HmacSha512_256 {
    // XXX(PANIC): the following panics the thread if the supplied key's length is invalid
    let mut mac = HmacSha512_256::new_from_slice(&key).unwrap();
    mac.update(msg);
    mac
}

impl Session {
    /// Generate a new wallet enclave session.
    pub fn new(msg: &[u8]) -> Self {
        let mut key = Vec::with_capacity(SESSION_KEY_LENGTH);
        rand::thread_rng().fill_bytes(&mut key);

        let mut mac = create_mac_context(&key, msg);
        let id = mac.finalize_reset().into_bytes().to_vec();

        Self { id, key }
    }
    /// Validate and authenticate a new message based on state generated in connection with a prior message.
    pub fn validate_new_msg(
        &self,
        session_id: &[u8],
        new_msg: &[u8],
        tag: &[u8],
    ) -> ValidateMsgResult {
        match ConsttimeMemEq::consttime_memeq(self.id.as_slice(), session_id) {
            false => ValidateMsgResult::InvalidSessionId,
            true => {
                let mac = create_mac_context(&self.key, new_msg);
                match mac.verify_slice(tag) {
                    Ok(()) => ValidateMsgResult::Valid,
                    _ => ValidateMsgResult::InvalidMsg,
                }
            }
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
