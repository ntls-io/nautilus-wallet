#![no_std]

#[macro_use]
extern crate sgx_tstd as std;

mod helpers;
mod ported;

use std::backtrace;
use std::string::String;
use std::vec::Vec;

use sgx_tunittest::*;
use sgx_types::sgx_status_t;

#[no_mangle]
pub extern "C" fn run_tests_ecall() -> sgx_status_t {
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
    );

    sgx_status_t::SGX_SUCCESS
}
