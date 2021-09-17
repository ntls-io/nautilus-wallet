use std::net::ToSocketAddrs;

use actix::{Actor, Addr, Arbiter};
use actix_cors::Cors;
use actix_web::{web, App, HttpServer};

use crate::actors::WalletEnclaveActor;
use crate::resources;
use crate::traits::WalletEnclave;

#[derive(Clone)]
pub(crate) struct AppState {
    pub(crate) wallet_enclave_addr: Addr<WalletEnclaveActor>,
}

/// Run the server on the given address.
pub async fn run_server<Addr>(
    wallet_enclave: Box<dyn WalletEnclave>,
    bind_addr: Addr,
) -> std::io::Result<()>
where
    Addr: ToSocketAddrs,
{
    let enclave_arbiter = Arbiter::new();
    let wallet_enclave_addr = Actor::start_in_arbiter(&enclave_arbiter.handle(), |_ctx| {
        WalletEnclaveActor { wallet_enclave }
    });

    let _guard = sentry::init(("https://52150892e1194e90b73b1c616e03fe69@o1000800.ingest.sentry.io/5962496", sentry::ClientOptions {
        release: sentry::release_name!(),
        ..Default::default()
    }));

    // TODO: Test coverage
    let server = HttpServer::new(move || {
        let app_state = AppState {
            wallet_enclave_addr: wallet_enclave_addr.clone(),
        };
        let cors = Cors::permissive(); // TODO: Tighten this a bit more?
        App::new()
            .wrap(cors)
            .app_data(web::Data::new(app_state))
            .service(resources::enclave_report::get_enclave_report)
            .service(resources::wallet_operation::post_wallet_operation)
    });
    server.bind(bind_addr)?.run().await
}
