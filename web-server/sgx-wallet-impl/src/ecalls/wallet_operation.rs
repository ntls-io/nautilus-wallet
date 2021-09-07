use std::prelude::v1::ToString;
use std::{ptr, slice};

use sgx_types::{sgx_status_t, size_t, uint8_t};

use crate::ecall_helpers::catch_unwind_message;
use crate::wallet_operations::dispatch::wallet_operation_impl;

/// ECALL wrapper for [`wallet_operation_impl`].
///
/// # Errors
///
/// * [`sgx_status_t::SGX_ERROR_INVALID_PARAMETER`] - received null or empty request or response buffers
///
/// * [`sgx_status_t::SGX_ERROR_FAAS_BUFFER_TOO_SHORT`] - response exceeds buffer capacity
///
/// * [`sgx_status_t::SGX_ERROR_UNEXPECTED`] - unwinding panic occurred
///
/// # Safety
/// Expects to be called from SGX bridge, with validated input.
#[no_mangle]
pub unsafe extern "C" fn wallet_operation(
    sealed_request_buffer: *const uint8_t,
    sealed_request_size: size_t,
    sealed_response_buffer: *mut uint8_t,
    sealed_response_capacity: size_t,
    sealed_response_used: *mut size_t,
) -> sgx_status_t {
    if sealed_request_buffer.is_null() || sealed_response_buffer.is_null() {
        return sgx_status_t::SGX_ERROR_INVALID_PARAMETER;
    }

    // Get the request buffer as a slice.
    let sealed_request =
        unsafe { slice::from_raw_parts(sealed_request_buffer, sealed_request_size) };

    let sealed_response = match catch_unwind_message(|| wallet_operation_impl(sealed_request)) {
        Ok(ok) => ok,
        Err(message) => {
            println!(
                "PANIC in wallet_operation_impl ECALL: {}",
                message.unwrap_or_else(|| ("XXX").to_string())
            );
            return sgx_status_t::SGX_ERROR_UNEXPECTED;
        }
    };

    // Check capacity, and copy the response buffer out.
    if sealed_response.len() <= sealed_response_capacity {
        unsafe {
            ptr::copy_nonoverlapping(
                sealed_response.as_ptr(),
                sealed_response_buffer,
                sealed_response.len(),
            );
            *sealed_response_used = sealed_response.len();
        }
        sgx_status_t::SGX_SUCCESS
    } else {
        sgx_status_t::SGX_ERROR_FAAS_BUFFER_TOO_SHORT
    }
}
