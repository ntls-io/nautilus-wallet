//! Safe Rust wrappers around [`enclave_u`].

use sgx_helpers::status::sgx_success_and_then;
use sgx_types::{sgx_enclave_id_t, sgx_report_t, sgx_status_t, sgx_target_info_t, SgxResult};

use crate::enclave_u;

pub fn safe_enclave_create_report(
    eid: sgx_enclave_id_t,
    qe3_target: sgx_target_info_t,
) -> SgxResult<SgxResult<(sgx_report_t, [u8; 32])>> {
    let mut retval = sgx_status_t::SGX_ERROR_UNEXPECTED;
    let mut ret_report: sgx_report_t = sgx_report_t::default();
    let mut ret_enclave_data = [0; 32];

    let result = unsafe {
        enclave_u::enclave_create_report(
            eid,
            &mut retval,
            &qe3_target,
            &mut ret_report,
            &mut ret_enclave_data,
        )
    };

    sgx_success_and_then(result, || {
        sgx_success_and_then(retval, || (ret_report, ret_enclave_data))
    })
}
