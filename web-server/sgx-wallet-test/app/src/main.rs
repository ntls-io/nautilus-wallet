extern crate sgx_types;
extern crate sgx_urts;

#[path = "../codegen/Enclave_u.rs"]
mod enclave_u;

use sgx_types::{
    sgx_attributes_t,
    sgx_launch_token_t,
    sgx_misc_attribute_t,
    sgx_status_t,
    SgxResult,
};
use sgx_urts::SgxEnclave;

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

fn main() {
    let enclave = match init_enclave() {
        Ok(r) => {
            println!("[+] Init Enclave Successful {}!", r.geteid());
            r
        }
        Err(x) => {
            println!("[-] Init Enclave Failed {}!", x.as_str());
            return;
        }
    };

    let mut retval = sgx_status_t::SGX_ERROR_UNEXPECTED;

    let result = unsafe { enclave_u::run_tests_ecall(enclave.geteid(), &mut retval) };

    match result {
        sgx_status_t::SGX_SUCCESS => {}
        _ => {
            println!("[-] ECALL Enclave Failed {}!", result.as_str());
            return;
        }
    }

    println!("[+] ecall_test success...");

    enclave.destroy();
}
