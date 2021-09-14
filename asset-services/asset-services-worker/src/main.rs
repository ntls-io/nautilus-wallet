use std::error::Error;

use asset_services_celery::run_helpers::{init_celery_from_env, init_logging_from_env};

#[tokio::main]
async fn main() -> Result<(), Box<dyn Error>> {
    init_logging_from_env();
    let celery = init_celery_from_env().await?;
    celery.display_pretty().await;

    celery.consume().await?;

    Ok(())
}
