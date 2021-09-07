use sgx_types::{sgx_report_t, sgx_status_t, sgx_target_info_t, SgxResult};

/// Interface for working with wallet enclave.
pub trait WalletEnclave: Send + 'static {
    fn create_report(
        &self,
        target_info: sgx_target_info_t,
    ) -> SgxResult<SgxResult<(sgx_report_t, [u8; 32])>>;

    fn wallet_operation(
        &self,
        sealed_request: &[u8],
        sealed_response_capacity: usize,
    ) -> SgxResult<SgxResult<Box<[u8]>>>;

    /// Wrapper: Retry [`Self::wallet_operation`] with increasing capacity.
    fn wallet_operation_with_retry(
        &self,
        sealed_request: &[u8],
    ) -> SgxResult<SgxResult<Box<[u8]>>> {
        // Attempt sizes: 1 KiB, 64 KiB, 1 MiB
        for &sealed_response_capacity in &[1 << 10, 1 << 16, 1 << 20] {
            let result = self.wallet_operation(sealed_request, sealed_response_capacity);
            match result {
                Ok(Err(sgx_status_t::SGX_ERROR_FAAS_BUFFER_TOO_SHORT)) => {
                    println!(
                        "DEBUG: wallet_operation_with_retry: capacity={} too short, retrying…",
                        sealed_response_capacity
                    )
                }
                result => {
                    if cfg!(feature = "verbose-debug-logging") {
                        println!(
                            "DEBUG: wallet_operation_with_retry: capacity={} returning {:?}",
                            sealed_response_capacity, result
                        );
                    }
                    return result;
                }
            }
        }
        println!("DEBUG: wallet_operation_with_retry: giving up!",);
        Ok(Err(sgx_status_t::SGX_ERROR_FAAS_BUFFER_TOO_SHORT))
    }
}
