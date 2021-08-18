use std::prelude::v1::ToString;

use sgx_wallet_impl::schema::actions;
use sgx_wallet_impl::schema::actions::OpenWalletResult;
use sgx_wallet_impl::wallet_operations::open_wallet::open_wallet;

use crate::helpers::wallet_store;

type Result = OpenWalletResult;

pub(crate) fn open_wallet_works() {
    let existing = &wallet_store::create_test_wallet();

    let request = &actions::OpenWallet {
        wallet_id: existing.wallet_id.clone(),
        auth_pin: "123456".to_string(),
    };
    let display = &match open_wallet(request) {
        Result::Opened(opened) => opened,
        otherwise => panic!("{:?}", otherwise),
    };

    assert_eq!(display, existing);
}

pub(crate) fn open_wallet_malformed_wallet_id() {
    let request = &actions::OpenWallet {
        wallet_id: "malformed".to_string(),
        auth_pin: "123456".to_string(),
    };

    match open_wallet(request) {
        Result::Failed(_) => (),
        otherwise => panic!("{:?}", otherwise),
    }
}

pub(crate) fn open_wallet_bad_pin() {
    let existing = &wallet_store::create_test_wallet();

    let request = &actions::OpenWallet {
        wallet_id: existing.wallet_id.clone(),
        auth_pin: "000000".to_string(),
    };

    match open_wallet(request) {
        Result::InvalidAuth => (),
        otherwise => panic!("{:?}", otherwise),
    }
}
