#![no_std]

extern crate sgx_tstd as std;
extern crate sgx_types;

// Re-export ECALL implementations:
pub use sgx_wallet_impl::ecalls::enclave_create_report::enclave_create_report;
pub use sgx_wallet_impl::ecalls::wallet_operation::wallet_operation;
