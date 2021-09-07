#![no_std]

#[macro_use]
extern crate sgx_tstd as std;
extern crate sgx_tunittest;
extern crate sgx_types;

use std::string::String;
use std::vec::Vec;

use sgx_tunittest::*;
use sgx_types::sgx_status_t;

#[no_mangle]
pub extern "C" fn run_tests_ecall() -> sgx_status_t {
    rsgx_unit_tests!();

    sgx_status_t::SGX_SUCCESS
}
