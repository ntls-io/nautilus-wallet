use std::prelude::v1::ToString;

use sgx_wallet_impl::schema::actions;
use sgx_wallet_impl::schema::actions::{OnfidoCheckResult, SaveOnfidoCheckResult};
use sgx_wallet_impl::schema::types::WalletPin;
use sgx_wallet_impl::wallet_operations::save_onfido_check::save_onfido_check;

use crate::helpers::wallet_store::{create_test_wallet, load_test_check};

fn get_check() -> OnfidoCheckResult {
    OnfidoCheckResult {
        id: "stub id".to_string(),
        href: "stub href".to_string(),
        result: "stub result".to_string(),
        sub_result: None,
    }
}

pub(crate) fn save_onfido_check_works() {
    let existing = create_test_wallet();
    let check = get_check();

    let request = actions::SaveOnfidoCheck {
        wallet_id: existing.wallet_id.clone(),
        auth_pin: WalletPin::from("123456"),
        check: check.clone(),
    };
    match save_onfido_check(&request) {
        SaveOnfidoCheckResult::Saved => {}
        otherwise => panic!("{:?}", otherwise),
    };

    let saved = load_test_check(&existing);
    assert_eq!(saved, check)
}

pub(crate) fn save_onfido_check_malformed_wallet_id() {
    let request = actions::SaveOnfidoCheck {
        wallet_id: "malformed".into(),
        auth_pin: "123456".into(),
        check: get_check(),
    };

    match save_onfido_check(&request) {
        SaveOnfidoCheckResult::Failed(_) => (),
        otherwise => panic!("{:?}", otherwise),
    }
}

pub(crate) fn save_onfido_check_bad_pin() {
    let existing = create_test_wallet();

    let request = actions::SaveOnfidoCheck {
        wallet_id: existing.wallet_id,
        auth_pin: "000000".to_string(),
        check: get_check(),
    };

    match save_onfido_check(&request) {
        SaveOnfidoCheckResult::InvalidAuth => (),
        otherwise => panic!("{:?}", otherwise),
    }
}
