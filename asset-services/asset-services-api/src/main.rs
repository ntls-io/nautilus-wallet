mod errors;
mod handlers;
mod helpers;

use std::error::Error;
use std::sync::Arc;

use asset_services_celery::run_helpers::{init_celery_from_env, init_logging_from_env};
use axum::handler::post;
use axum::{AddExtensionLayer, Router};

use crate::helpers::bind_addr_from_env;

#[tokio::main]
async fn main() -> Result<(), Box<dyn Error>> {
    init_logging_from_env();

    let bind_addr = bind_addr_from_env()?;

    let celery = Arc::new(init_celery_from_env().await?);
    celery.display_pretty().await;

    let axum_app = Router::new()
        .route("/ping", post(handlers::misc::ping))
        .layer(AddExtensionLayer::new(celery.clone()));
    let axum_server = axum::Server::bind(&bind_addr).serve(axum_app.into_make_service());
    log::info!("listening on http://{}", bind_addr);
    axum_server.await?;

    celery.close().await?;

    Ok(())
}
