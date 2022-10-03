use std::io;

use sgx_trts::memeq::ConsttimeMemEq;
use thiserror::Error;

use crate::schema::types::{WalletAuthMap, WalletId};
use crate::wallet_operations::store::load_wallet;

#[derive(Debug, Error)]
/// An error type for when authentication, via a security challenge, goes awry
pub enum AuthError {
    #[error("One or more invalid challenges submitted")]
    InvalidAttempt,
    #[error("Wallet id {0:?} not found")]
    InvalidWalletId(WalletId),
    #[error(transparent)]
    Io(#[from] io::Error),
}

#[derive(Copy, Clone, Eq, PartialEq, Debug)]
/// The outcome of a security challenge
pub enum ChallengeOutcome {
    Success,
    Failure,
}

#[derive(Debug)]
/// A type representing an attempted security challenge.  Authentication fails
/// if two or more user responses are incorrect.
pub struct WalletChallenge {
    auth_attempts: WalletAuthMap,
    stored_responses: WalletAuthMap,
}

impl WalletChallenge {
    pub fn new(wallet_id: &WalletId, auth_attempts: WalletAuthMap) -> Result<Self, AuthError> {
        /*
         *  Attempt to retrieve wallet and convert any ['io::Error'] values returned
         */
        let stored = load_wallet(wallet_id).or_else(|err| Err(AuthError::from(err)))?;

        /*
         *  If ['None'], then the given wallet id was invalid so we return an ['AuthError']
         */
        match stored {
            Some(mut wallet_storable) => {
                let stored_responses =
                    WalletAuthMap::from_iter(wallet_storable.auth_map.drain().into_iter());
                Ok(Self {
                    auth_attempts,
                    stored_responses,
                })
            }
            None => Err(AuthError::InvalidWalletId(wallet_id.clone())),
        }
    }
    pub fn authenticate(mut self) -> Result<ChallengeOutcome, AuthError> {
        let mut stored = self.stored_responses.drain();
        let mut mismatch_count = 0;

        while let Some((key, stored_secret)) = stored.next() {
            if let Some(attempt) = self.auth_attempts.get(&key) {
                /*
                 *  Comparison of secrets, signatures, hashes and other values
                 *  of cryptographic nature must *always* be performed in
                 *  constant time. This is a mitigation against timing-based
                 *  side-channel attacks. Further reading:
                 *  - https://en.wikipedia.org/wiki/Time_complexity#Constant_time,
                 *  - https://en.wikipedia.org/wiki/Timing_attack.
                 */
                match ConsttimeMemEq::consttime_memeq(stored_secret.as_bytes(), attempt.as_bytes())
                {
                    true => (),
                    false => mismatch_count += 1,
                }
            } else {
                return Err(AuthError::InvalidAttempt);
            }
        }

        /*
         *  Authentication fails iff two or more user responses were incorect
         */
        if mismatch_count > 1 {
            return Ok(ChallengeOutcome::Failure);
        }
        Ok(ChallengeOutcome::Success)
    }
}
