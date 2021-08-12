#![no_std]

#[macro_use]
extern crate sgx_tstd as std;

mod ported;

use std::string::String;
use std::vec::Vec;

use sgx_tunittest::*;
use sgx_types::sgx_status_t;

#[no_mangle]
pub extern "C" fn run_tests_ecall() -> sgx_status_t {
    rsgx_unit_tests!(
        ported::proptest_crypto::prop_soda_box_roundtrips,
        ported::test_attestation::create_report_impl_works,
        ported::test_crypto::soda_box_decrypt_works,
        ported::test_crypto::soda_box_encrypt_works,
    );

    sgx_status_t::SGX_SUCCESS
}
