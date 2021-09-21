use std::error::Error;

use asset_services_celery::run_helpers;

#[tokio::main]
async fn main() -> Result<(), Box<dyn Error>> {
    run_helpers::init_logging_from_env();
    let celery = run_helpers::init_celery_from_env().await?;
    celery.display_pretty().await;

    celery.consume().await?;

    Ok(())
}
