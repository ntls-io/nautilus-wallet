#![no_std]

#[macro_use]
extern crate sgx_tstd as std;

mod helpers;
mod ported;
mod schema;
mod wallet_operations;

use std::backtrace;
use std::string::String;
use std::vec::Vec;

use sgx_tunittest::*;

#[no_mangle]
pub extern "C" fn run_tests_ecall() -> usize {
    backtrace::enable_backtrace("enclave.signed.so", backtrace::PrintFormat::Short).unwrap();

    rsgx_unit_tests!(
        ported::proptest_crypto::prop_soda_box_roundtrips,
        ported::test_attestation::create_report_impl_works,
        ported::test_crypto::soda_box_decrypt_works,
        ported::test_crypto::soda_box_encrypt_works,
        ported::test_kv_store::test_alter,
        ported::test_kv_store::test_load_save_delete,
        ported::test_kv_store::test_mutate,
        ported::test_kv_store::test_try_insert,
        ported::test_kv_store_fs::prop_fs_safe_roundtrip,
        schema::test_sealing::prop_seal_unseal_msgpack_roundtrips,
        schema::test_sealing::prop_seal_unseal_roundtrips,
        schema::test_types::test_xrpl_key_type_serde,
        wallet_operations::test_create_wallet::create_wallet_works,
        wallet_operations::test_dispatch::wallet_operation_sealing_works,
        wallet_operations::test_load_onfido_check::load_onfido_check_bad_pin,
        wallet_operations::test_load_onfido_check::load_onfido_check_malformed_wallet_id,
        wallet_operations::test_load_onfido_check::load_onfido_check_not_found,
        wallet_operations::test_load_onfido_check::load_onfido_check_works,
        wallet_operations::test_get_xrpl_wallet::get_xrpl_wallet_works,
        wallet_operations::test_get_xrpl_wallet::get_xrpl_wallet_malformed_wallet_id,
        wallet_operations::test_open_wallet::open_wallet_bad_pin,
        wallet_operations::test_open_wallet::open_wallet_malformed_wallet_id,
        wallet_operations::test_open_wallet::open_wallet_works,
        wallet_operations::test_save_onfido_check::save_onfido_check_bad_pin,
        wallet_operations::test_save_onfido_check::save_onfido_check_malformed_wallet_id,
        wallet_operations::test_save_onfido_check::save_onfido_check_works,
        wallet_operations::test_sign_transaction::sign_transaction_empty,
        wallet_operations::test_sign_transaction::sign_transaction_malformed_transaction,
        wallet_operations::test_sign_transaction::sign_transaction_without_tag,
        wallet_operations::test_sign_transaction::sign_transaction_works,
        wallet_operations::test_sign_transaction_msgpack::prop_transaction_msgpack_roundtrips,
        wallet_operations::test_sign_transaction_xrpl::sign_transaction_empty,
        wallet_operations::test_pin_reset::start_pin_reset_success,
        wallet_operations::test_pin_reset::start_pin_reset_failure,
        wallet_operations::test_pin_reset::reset_wallet_pin_success,
        wallet_operations::test_store::unlock_wallet_bad_auth_pin,
        wallet_operations::test_store::unlock_wallet_malformed_wallet_id,
        wallet_operations::test_store::unlock_wallet_not_found,
        wallet_operations::test_store::unlock_wallet_works,
    )
}
