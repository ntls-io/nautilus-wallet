//! Safe Rust wrappers around [`enclave_u`].

use sgx_types::{sgx_enclave_id_t, sgx_status_t, size_t, SgxResult};

use crate::enclave_u;

pub(crate) fn safe_run_tests_ecall(eid: sgx_enclave_id_t) -> SgxResult<size_t> {
    let mut retval = size_t::MAX;
    match unsafe { enclave_u::run_tests_ecall(eid, &mut retval) } {
        sgx_status_t::SGX_SUCCESS => Ok(retval),
        err => Err(err),
    }
}
