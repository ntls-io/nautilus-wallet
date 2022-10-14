use std::prelude::v1::ToString;

use sgx_wallet_impl::schema::actions;
use sgx_wallet_impl::schema::actions::GetXrplWalletResult;
use sgx_wallet_impl::wallet_operations::get_xrpl_wallet::get_xrpl_wallet;

use crate::helpers::wallet_store;

type Result = GetXrplWalletResult;

pub(crate) fn get_xrpl_wallet_works() {
    let existing = &wallet_store::create_test_wallet();

    let request = &actions::GetXrplWallet {
        wallet_id: existing.wallet_id.clone(),
    };

    let display = &match get_xrpl_wallet(request) {
        Result::Opened(opened) => opened,
        otherwise => panic!("{:?}", otherwise),
    };

    assert_eq!(display, &existing.xrpl_account);
}

pub(crate) fn get_xrpl_wallet_malformed_wallet_id() {
    let request = &actions::GetXrplWallet {
        wallet_id: "malformed".to_string(),
    };

    match get_xrpl_wallet(request) {
        Result::Failed(_) => (),
        otherwise => panic!("{:?}", otherwise),
    }
}
