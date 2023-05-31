use core::borrow::BorrowMut;
use std::cell::RefCell;
use std::string::String;

use sgx_wallet_impl::schema::actions::{
    PinReset,
    PinResetResult,
    StartPinReset,
    StartPinResetResult,
};
use sgx_wallet_impl::schema::types::WalletAuthMap;
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
    assert!(matches!(result, StartPinResetResult::Success))
}

pub fn reset_wallet_pin_success() {
    let test_wallet = create_test_wallet();
    let mut stored_wallet = load_wallet(&test_wallet.wallet_id).unwrap().unwrap();
    let new_pin = String::from("654321");

    let request = PinReset {
        wallet_id: stored_wallet.wallet_id.clone(),
        wallet_auth_map: RefCell::new(WalletAuthMap::from_iter(
            stored_wallet.auth_map.borrow_mut().drain().into_iter(),
        )),
        new_pin,
    };
    assert!(matches!(reset_wallet_pin(&request), PinResetResult::Reset));
}
