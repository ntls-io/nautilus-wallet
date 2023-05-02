use std::cell::RefCell;
use std::string::ToString;

use crate::schema::actions::{PinReset, PinResetResult, StartPinReset, StartPinResetResult};
use crate::schema::auth::{ChallengeOutcome, WalletChallenge};
use crate::schema::types::{WalletAuthMap, WalletId};
use crate::wallet_operations::store::mutate_wallet;

fn challenge_outcome(wallet_id: &WalletId, map: RefCell<WalletAuthMap>) -> StartPinResetResult {
    WalletChallenge::new(
        wallet_id,
        WalletAuthMap::from_iter(map.borrow_mut().drain().into_iter()),
    )
    // Map output to a ['StartPinResetResult'].
    // It might be helpful to read the following in reverse order.
    .map_or_else(
        // Outer path: authentication failed due to an unexpected error,
        // see ['AuthError'].
        |err| StartPinResetResult::from(err),
        // Outer path: succesfully created an ['WalletChallenge']
        |challenge| {
            challenge.authenticate().map_or_else(
                // Inner path: authentication failed due to an unexpected
                // error, see ['AuthError'].
                |err| StartPinResetResult::from(err),
                // Inner path: check authentication outcome
                |outcome| match outcome {
                    ChallengeOutcome::Success => StartPinResetResult::Success,
                    ChallengeOutcome::Failure => StartPinResetResult::InvalidAuth,
                },
            )
        },
    )
}

pub fn start_pin_reset(request: &StartPinReset) -> StartPinResetResult {
    challenge_outcome(
        &request.wallet_id,
        RefCell::new(WalletAuthMap::from_iter(
            request.wallet_auth_map.borrow_mut().drain().into_iter(),
        )),
    )
}

/// Resets the pin for a wallet stored in the KV store.
pub fn reset_wallet_pin(request: &PinReset) -> PinResetResult {
    match challenge_outcome(
        &request.wallet_id,
        RefCell::new(WalletAuthMap::from_iter(
            request.wallet_auth_map.borrow_mut().drain().into_iter(),
        )),
    ) {
        StartPinResetResult::Success => {
            match mutate_wallet(&request.wallet_id, |mut stored| {
                stored.auth_pin = request.new_pin.clone();
                stored
            }) {
                Ok(Some(_)) => PinResetResult::Reset,
                Ok(None) => PinResetResult::NotFound,
                Err(err) => PinResetResult::Failed(err.to_string()),
            }
        }
        StartPinResetResult::InvalidAuth => PinResetResult::InvalidAuth,
        StartPinResetResult::NotFound => PinResetResult::NotFound,
        StartPinResetResult::Failed(msg) => PinResetResult::Failed(msg),
    }
}
