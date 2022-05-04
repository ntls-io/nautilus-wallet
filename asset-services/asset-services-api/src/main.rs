mod errors;
mod handlers;
mod helpers;

use std::error::Error;
use std::sync::Arc;

use asset_services_celery::run_helpers::{init_celery_from_env, init_logging_from_env};
use axum::handler::post;
use axum::{AddExtensionLayer, Router};
use tower_http::cors::CorsLayer;

use crate::helpers::bind_addr_from_env;

#[tokio::main]
async fn main() -> Result<(), Box<dyn Error>> {
    init_logging_from_env();

    let bind_addr = bind_addr_from_env()?;

    let celery = Arc::new(init_celery_from_env().await?);
    celery.display_pretty().await;

    // CORS:
    let cors_layer = CorsLayer::permissive();

    let axum_app = Router::new()
        .route("/ping", post(handlers::misc::ping))
        .route("/verify/start", post(handlers::verification::start_verify))
        .route("/verify/check", post(handlers::verification::check_verify))
        .route("/kyc/start", post(handlers::kyc::start_kyc))
        .route("/kyc/checks/create", post(handlers::kyc::create_check))
        .route("/kyc/checks/retrieve", post(handlers::kyc::retrieve_check))
        .route(
            "/messages/create",
            post(handlers::messaging::create_message),
        )
        .layer(AddExtensionLayer::new(celery.clone()))
        // The CORS layer must come after the wrapped resources, for correct response headers.
        .layer(cors_layer);
    let axum_server = axum::Server::bind(&bind_addr).serve(axum_app.into_make_service());
    log::info!("listening on http://{}", bind_addr);
    axum_server.await?;

    celery.close().await?;

    Ok(())
}
