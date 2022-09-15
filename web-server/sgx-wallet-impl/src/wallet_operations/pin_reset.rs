use std::string::ToString;

use crate::crypto::common::*;
use crate::crypto::key_agreement::DiffieHellman;
use crate::crypto::sgx_get_key::SgxGetKey;
use crate::schema::actions::{PinReset, PinResetResult, StartPinReset, StartPinResetResult};
use crate::schema::auth::{ChallengeOutcome, WalletChallenge};
use crate::schema::types::WalletAuthMap;
use crate::wallet_operations::store::mutate_wallet;

use super::store::load_wallet;

pub fn start_pin_reset(request: &StartPinReset) -> StartPinResetResult {
    /* Lazily generate a public key, since it might not be needed */
    let generate_pk = || -> StartPinResetResult {
        let stored_wallet = match load_wallet(&request.wallet_id) {
            Ok(Some(stored)) => stored,
            Ok(None) => return StartPinResetResult::InvalidAuth,
            Err(err) => return StartPinResetResult::Failed(err.to_string()),
        };
        let sgx_get_key = match rmp_serde::to_vec(&stored_wallet) {
            Ok(stored) => SgxGetKey::with_salt(&[stored.as_slice(), &request.client_pk.as_slice()].concat(), request.wallet_id.as_bytes()),
            Err(err) => return StartPinResetResult::Failed(err.to_string()),
        };
        StartPinResetResult::ServerPk(sgx_get_key.get_key().pk)
    };

    WalletChallenge::new(
        &request.wallet_id,
        WalletAuthMap::from_iter(request.wallet_auth_map.borrow_mut().drain().into_iter()),
    )
    /*
     *  Map output to a ['StartPinResetResult'].
     *  It might be helpful to read the following in reverse order.
     */
    .map_or_else(
        /*
         *  Outer path: authentication failed due to an unexpected error,
         *  see ['AuthError'].
         */
        |err| StartPinResetResult::from(err),
        /*
         *  Outer path: succesfully created an ['WalletChallenge']
         */
        |challenge| {
            challenge.authenticate().map_or_else(
                /*
                 *  Inner path: authentication failed due to an unexpected
                 *  error, see['AuthError'].
                 */
                |err| StartPinResetResult::from(err),
                /*
                 *  Inner path: check authentication outcome
                 */
                |outcome| {
                    match outcome {
                        ChallengeOutcome::Success => return generate_pk(),
                        ChallengeOutcome::Failure => StartPinResetResult::InvalidAuth,
                    }
                },
            )
        },
    )
}

/// This function assumes the wallet id in the request exists in the KV store.
pub fn reset_wallet_pin(request: &PinReset) -> PinResetResult {
    let stored_wallet = match load_wallet(&request.wallet_id) {
        Ok(stored) => {
            stored.unwrap()
        },
        Err(err) => return PinResetResult::Failed(err.to_string()),
    };
    let sgx_get_key = match rmp_serde::to_vec(&stored_wallet) { 
        Ok(stored) => SgxGetKey::with_salt(&[stored.as_slice(), &request.client_pk.as_slice()].concat(), request.wallet_id.as_bytes()),
        Err(err) => return PinResetResult::Failed(err.to_string()),
    };
    let dh = DiffieHellman::new(sgx_get_key.get_key(), Some(&request.wallet_id.as_bytes()));
    let secret = dh.diffie_hellman(&request.client_pk);

    let mut mac = HmacSha256::new_from_slice(secret.expose_secret()).expect("Input slice has a fixed length of 32 bytes");
    mac.update(request.new_pin.as_bytes());
    mac.verify_slice(&request.new_pin_mac).map_or_else(|_| PinResetResult::InvalidAuth, |_| {
        match mutate_wallet(&request.wallet_id, |mut stored| {
            stored.auth_pin = request.new_pin.clone();
            stored
        }) {
            Ok(Some(_)) => return PinResetResult::Reset,
            Ok(None) => panic!("Wallet storable expected but not found"),
            Err(err) => return PinResetResult::Failed(err.to_string()),
        }
    })
}
