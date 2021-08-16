use secrecy::Zeroize;
use sgx_types::{sgx_report_t, sgx_status_t, sgx_target_info_t};

use crate::ported::attestation::create_report_impl;

/// ECALL wrapper for [`create_report_impl`].
///
/// # EDL
///
/// ```edl
/// include "sgx_report.h"
/// ```
///
/// # Errors
///
/// * [`sgx_status_t::SGX_ERROR_INVALID_PARAMETER`] - null pointer passed
///
/// * [`sgx_status_t::SGX_ERROR_UNEXPECTED`] - unwinding panic occurred
///
/// # Safety
///
/// Expects to be called from SGX bridge, with validated input.
///
#[no_mangle]
pub unsafe extern "C" fn enclave_create_report(
    p_qe3_target: *const sgx_target_info_t,
    p_report: *mut sgx_report_t,
    enclave_pubkey: *mut [u8; 32],
) -> sgx_status_t {
    if p_qe3_target.is_null() || enclave_pubkey.is_null() || p_report.is_null() {
        return sgx_status_t::SGX_ERROR_INVALID_PARAMETER;
    }
    let qe_target_info = &unsafe { *p_qe3_target };
    let (key, report) = match create_report_impl(qe_target_info) {
        Ok(res) => res,
        Err(x) => {
            unsafe {
                (*enclave_pubkey).zeroize();
            }
            return x;
        }
    };

    unsafe {
        *p_report = report;
        (*enclave_pubkey).copy_from_slice(&key);
    }
    sgx_status_t::SGX_SUCCESS
}
