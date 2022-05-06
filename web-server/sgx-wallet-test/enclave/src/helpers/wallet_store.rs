use std::prelude::v1::ToString;

use sgx_wallet_impl::schema::actions;
use sgx_wallet_impl::schema::actions::{
    CreateWalletResult,
    LoadOnfidoCheck,
    LoadOnfidoCheckResult,
    OnfidoCheckResult,
    SaveOnfidoCheck,
    SaveOnfidoCheckResult,
};
use sgx_wallet_impl::schema::entities::WalletDisplay;
use sgx_wallet_impl::wallet_operations::create_wallet::create_wallet;
use sgx_wallet_impl::wallet_operations::load_onfido_check::load_onfido_check;
use sgx_wallet_impl::wallet_operations::save_onfido_check::save_onfido_check;

pub fn create_test_wallet() -> WalletDisplay {
    type Result = CreateWalletResult;

    let request = &actions::CreateWallet {
        owner_name: "New Owner".to_string(),
        auth_pin: "123456".to_string(),
        phone_number: None,
    };
    match create_wallet(request) {
        Result::Created(created) => created,
        otherwise => panic!("{:?}", otherwise),
    }
}

pub fn create_test_check(existing: &WalletDisplay) -> OnfidoCheckResult {
    let check = OnfidoCheckResult {
        id: "stub id".to_string(),
        href: "stub href".to_string(),
        result: "stub result".to_string(),
        sub_result: None,
    };
    match save_onfido_check(&SaveOnfidoCheck {
        wallet_id: existing.wallet_id.clone(),
        auth_pin: "123456".to_string(),
        check: check.clone(),
    }) {
        SaveOnfidoCheckResult::Saved => {}
        otherwise => panic!("{:?}", otherwise),
    };
    check
}

pub fn load_test_check(existing: &WalletDisplay) -> OnfidoCheckResult {
    match load_onfido_check(&LoadOnfidoCheck {
        wallet_id: existing.wallet_id.clone(),
        auth_pin: "123456".to_string(),
    }) {
        LoadOnfidoCheckResult::Loaded(check) => check,
        otherwise => panic!("{:?}", otherwise),
    }
}
