use actix::{Actor, Addr, Arbiter};
use actix_web::web::Data;
use actix_web::{App, HttpServer};

use crate::actors::WalletEnclaveActor;
use crate::resources;
use crate::traits::WalletEnclave;

#[derive(Clone)]
pub(crate) struct AppState {
    pub(crate) wallet_enclave_addr: Addr<WalletEnclaveActor>,
}

/// Run the server on the given address.
pub async fn run_server(
    wallet_enclave: Box<dyn WalletEnclave>,
    bind_addr: &str,
) -> std::io::Result<()> {
    let enclave_arbiter = Arbiter::new();
    let wallet_enclave_addr = Actor::start_in_arbiter(&enclave_arbiter.handle(), |_ctx| {
        WalletEnclaveActor { wallet_enclave }
    });

    let server = HttpServer::new(move || {
        let app_state = AppState {
            wallet_enclave_addr: wallet_enclave_addr.clone(),
        };
        App::new()
            .app_data(Data::new(app_state))
            .service(resources::enclave_report)
    });
    println!("run_server: binding to http://{}/", bind_addr);
    let server1 = server.bind(bind_addr)?;
    server1.run().await
}
