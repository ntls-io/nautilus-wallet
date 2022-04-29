//! Test [`sgx_wallet_impl::wallet_operations::store`]

use std::prelude::v1::ToString;

use sgx_wallet_impl::ported::kv_store::KvStore;
use sgx_wallet_impl::schema::entities::WalletDisplay;
use sgx_wallet_impl::wallet_operations::store::{key_from_id, unlock_wallet, wallet_store};

use crate::helpers::wallet_store::create_test_wallet;

pub(crate) fn unlock_wallet_works() {
    let existing = create_test_wallet();
    let stored = unlock_wallet(&existing.wallet_id, "123456").unwrap();
    assert_eq!(existing, WalletDisplay::from(stored));
}

pub(crate) fn unlock_wallet_not_found() {
    let existing = create_test_wallet();
    let mut store = wallet_store();
    let key = &key_from_id(&existing.wallet_id).unwrap();
    store.delete(key).unwrap();

    let err = unlock_wallet(&existing.wallet_id, "123456").unwrap_err();
    assert_eq!(err.to_string(), "invalid wallet ID provided");
}

pub(crate) fn unlock_wallet_malformed_wallet_id() {
    create_test_wallet();
    let err = unlock_wallet("malformed", "123456").unwrap_err();
    assert_eq!(err.to_string(), "I/O error while opening wallet");
}

pub(crate) fn unlock_wallet_bad_auth_pin() {
    let existing = create_test_wallet();
    let err = unlock_wallet(&existing.wallet_id, "000000").unwrap_err();
    assert_eq!(err.to_string(), "invalid authentication PIN provided");
}
