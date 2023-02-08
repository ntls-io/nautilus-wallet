use std::cell::RefCell;
use std::string::String;

use secrecy::ExposeSecret;
use sgx_wallet_impl::crypto::common::{HmacSha256, Mac};
use sgx_wallet_impl::crypto::key_agreement::DiffieHellman;
use sgx_wallet_impl::crypto::sgx_get_key::SgxGetKey;
use sgx_wallet_impl::schema::actions::{
    PinReset,
    PinResetResult,
    StartPinReset,
    StartPinResetResult,
};
use sgx_wallet_impl::wallet_operations::pin_reset::{reset_wallet_pin, start_pin_reset};
use sgx_wallet_impl::wallet_operations::store::load_wallet;

use crate::helpers::wallet_store::{create_test_auth_map, create_test_wallet};

pub fn start_pin_reset_success() {
    let stored_wallet = create_test_wallet();
    let request = StartPinReset {
        wallet_id: stored_wallet.wallet_id,
        wallet_auth_map: RefCell::new(create_test_auth_map()),
        client_pk: [1u8; 32],
    };
    let result = start_pin_reset(&request);
    assert!(matches!(result, StartPinResetResult::ServerPk(_)))
}

pub fn reset_wallet_pin_success() {
    let client_pk = [1u8; 32];
    let test_wallet = create_test_wallet();
    let stored_wallet = load_wallet(&test_wallet.wallet_id).unwrap().unwrap();
    let new_pin = String::from("654321");

    let stored = rmp_serde::to_vec(&stored_wallet).unwrap();
    let sgx_get_key = SgxGetKey::with_salt(
        &[stored.as_slice(), &client_pk.as_slice()].concat(),
        stored_wallet.wallet_id.as_bytes(),
    );
    let shared_secret = DiffieHellman::new(
        sgx_get_key.get_key(),
        Some(stored_wallet.wallet_id.as_bytes()),
    )
    .diffie_hellman(&client_pk);

    let mut mac = HmacSha256::new_from_slice(shared_secret.expose_secret()).unwrap();
    mac.update(new_pin.as_bytes());
    let request = PinReset {
        client_pk,
        new_pin,
        new_pin_mac: <[u8; 32]>::try_from(mac.finalize().into_bytes()).unwrap(),
        wallet_id: stored_wallet.wallet_id.clone(),
    };
    assert!(matches!(reset_wallet_pin(&request), PinResetResult::Reset));
}
