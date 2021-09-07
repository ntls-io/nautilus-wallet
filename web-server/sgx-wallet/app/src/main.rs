extern crate sgx_types;
extern crate sgx_urts;

use std::fs::create_dir_all;
use std::net::ToSocketAddrs;
use std::{env, io};

use http_service_impl::server::run_server;
use sgx_types::{sgx_attributes_t, sgx_launch_token_t, sgx_misc_attribute_t, SgxResult};
use sgx_urts::SgxEnclave;

use crate::trait_impls::WalletEnclaveImpl;

#[path = "../codegen/Enclave_u.rs"]
mod enclave_u;
mod safe_ecalls;
mod trait_impls;

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

#[actix_web::main]
async fn main() -> io::Result<()> {
    let enclave = init_enclave()
        .map_err(|sgx_error| {
            io::Error::new(
                io::ErrorKind::Other,
                format!("init_enclave failed: {:?}", sgx_error),
            )
        })
        .unwrap();
    let wallet_enclave = Box::new(WalletEnclaveImpl { enclave });

    // FIXME: See WALLET_STORE_DIR
    create_dir_all("wallet_store")?;

    let bind_addr = match env::var("BIND_ADDR") {
        Err(env::VarError::NotPresent) => Ok("127.0.0.1:8080".to_string()),
        otherwise => otherwise,
    }
    .map_err(|err| io::Error::new(io::ErrorKind::InvalidData, err))?;

    for socket_addr in bind_addr.to_socket_addrs()? {
        println!("run_server: binding to http://{}/", socket_addr);
    }

    run_server(wallet_enclave, bind_addr).await
}
