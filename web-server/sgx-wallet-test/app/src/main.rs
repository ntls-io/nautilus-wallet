#[path = "../codegen/Enclave_u.rs"]
mod enclave_u;
mod safe_ecalls;

use std::fs::create_dir_all;

use sgx_types::{sgx_attributes_t, sgx_launch_token_t, sgx_misc_attribute_t, SgxResult};
use sgx_urts::SgxEnclave;

use crate::safe_ecalls::safe_run_tests_ecall;

static ENCLAVE_FILE: &str = "enclave.signed.so";

fn init_enclave() -> SgxResult<SgxEnclave> {
    let mut launch_token: sgx_launch_token_t = [0; 1024];
    let mut launch_token_updated: i32 = 0;
    // call sgx_create_enclave to initialize an enclave instance
    // Debug Support: set 2nd parameter to 1
    let debug = 1;
    let mut misc_attr = sgx_misc_attribute_t {
        secs_attr: sgx_attributes_t { flags: 0, xfrm: 0 },
        misc_select: 0,
    };
    SgxEnclave::create(
        ENCLAVE_FILE,
        debug,
        &mut launch_token,
        &mut launch_token_updated,
        &mut misc_attr,
    )
}

fn main() -> Result<(), String> {
    let enclave = init_enclave().map_err(|err| format!("init_enclave failed: {:?}", err))?;

    // FIXME: See WALLET_STORE_DIR
    create_dir_all("wallet_store")
        .map_err(|err| format!("failed to create test wallet_store directory: {:?}", err))?;

    let failed_tests = safe_run_tests_ecall(enclave.geteid())
        .map_err(|err| format!("run_tests_ecall failed: {:?}", err))?;

    enclave.destroy();

    match failed_tests {
        0 => Ok(()),
        _ => Err(format!("{} tests failed", failed_tests)),
    }
}
