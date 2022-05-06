use std::prelude::v1::ToString;

use sgx_wallet_impl::schema::actions;
use sgx_wallet_impl::schema::actions::LoadOnfidoCheckResult;
use sgx_wallet_impl::wallet_operations::load_onfido_check::load_onfido_check;

use crate::helpers::wallet_store;
use crate::helpers::wallet_store::create_test_wallet;

pub(crate) fn load_onfido_check_works() {
    let existing = create_test_wallet();
    let existing_check = wallet_store::create_test_check(&existing);

    let request = actions::LoadOnfidoCheck {
        wallet_id: existing.wallet_id,
        auth_pin: "123456".to_string(),
    };
    let loaded_check = match load_onfido_check(&request) {
        LoadOnfidoCheckResult::Loaded(loaded) => loaded,
        otherwise => panic!("{:?}", otherwise),
    };

    assert_eq!(existing_check, loaded_check);
}

pub(crate) fn load_onfido_check_not_found() {
    let existing = create_test_wallet();

    let request = actions::LoadOnfidoCheck {
        wallet_id: existing.wallet_id.clone(),
        auth_pin: "123456".to_string(),
    };
    match load_onfido_check(&request) {
        LoadOnfidoCheckResult::NotFound => (),
        otherwise => panic!("{:?}", otherwise),
    };
}

pub(crate) fn load_onfido_check_malformed_wallet_id() {
    let request = actions::LoadOnfidoCheck {
        wallet_id: "malformed".to_string(),
        auth_pin: "123456".to_string(),
    };

    match load_onfido_check(&request) {
        LoadOnfidoCheckResult::Failed(_) => (),
        otherwise => panic!("{:?}", otherwise),
    }
}

pub(crate) fn load_onfido_check_bad_pin() {
    let existing = create_test_wallet();

    let request = actions::LoadOnfidoCheck {
        wallet_id: existing.wallet_id.clone(),
        auth_pin: "000000".to_string(),
    };

    match load_onfido_check(&request) {
        LoadOnfidoCheckResult::InvalidAuth => (),
        otherwise => panic!("{:?}", otherwise),
    }
}
