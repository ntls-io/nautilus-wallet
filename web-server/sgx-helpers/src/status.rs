//! Helpers for working with [`sgx_status_t`] and [`SgxResult`]

use sgx_types::{sgx_status_t, SgxResult};

pub fn sgx_success_and<T>(status: sgx_status_t, value: T) -> SgxResult<T> {
    match status {
        sgx_status_t::SGX_SUCCESS => Ok(value),
        error => Err(error),
    }
}

pub fn sgx_success_and_then<F, T>(status: sgx_status_t, f: F) -> SgxResult<T>
where
    F: FnOnce() -> T,
{
    match status {
        sgx_status_t::SGX_SUCCESS => Ok(f()),
        error => Err(error),
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn sgx_success_and_works() {
        assert_eq!(
            sgx_success_and(sgx_status_t::SGX_SUCCESS, "success"),
            Ok("success")
        );
        assert_eq!(
            sgx_success_and(sgx_status_t::SGX_ERROR_INVALID_PARAMETER, "failure"),
            Err(sgx_status_t::SGX_ERROR_INVALID_PARAMETER)
        );
    }

    #[test]
    fn sgx_success_and_then_works() {
        assert_eq!(
            sgx_success_and_then(sgx_status_t::SGX_SUCCESS, || "success"),
            Ok("success")
        );
        assert_eq!(
            sgx_success_and_then(sgx_status_t::SGX_ERROR_INVALID_PARAMETER, || "failure"),
            Err(sgx_status_t::SGX_ERROR_INVALID_PARAMETER)
        );
    }
}
