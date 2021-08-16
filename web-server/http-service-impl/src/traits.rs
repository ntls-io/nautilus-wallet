use sgx_types::{sgx_report_t, sgx_target_info_t, SgxResult};

/// Interface for working with wallet enclave.
pub trait WalletEnclave: Send + 'static {
    fn create_report(
        &self,
        target_info: sgx_target_info_t,
    ) -> SgxResult<SgxResult<(sgx_report_t, [u8; 32])>>;
}
