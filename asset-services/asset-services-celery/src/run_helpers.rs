//! Helpers for running processes that interact with a Celery task queue.

use std::error::Error;
use std::io;

use celery::error::CeleryError;
use env_var_helpers::env_vars;

use crate::celery_box::CeleryBox;
use crate::tasks;

/// Initialise [`env_logger`] with `Info` logging.
///
/// To customise, set the `RUST_LOG` environment variable to one of `error`, `warn`, `info`, `debug`, `trace`:
///
/// <https://docs.rs/env_logger/0.9.0/env_logger/#enabling-logging>
pub fn init_logging_from_env() {
    env_logger::Builder::from_env(env_logger::Env::default().default_filter_or("info")).init();
}

/// Initialise a [`CeleryBox`] app instance with the broker specified by the `BROKER_URL` environment variable.
pub async fn init_celery_from_env() -> Result<CeleryBox, CeleryError> {
    let broker_url = env_vars::var("BROKER_URL").map_err(io::Error::from)?;
    init_celery_app(&broker_url).await
}

/// Initialise a [`CeleryBox`] app instance with the specified broker.
pub async fn init_celery_app(broker_url: &str) -> Result<CeleryBox, CeleryError> {
    // The name "celery" matches the default value of the celery::app! macro.
    let celery = CeleryBox::build("celery", broker_url).await?;

    // Register our tasks:
    celery.register_task::<tasks::misc::ping>().await?;
    celery
        .register_task::<tasks::verification::start_verify>()
        .await?;
    celery
        .register_task::<tasks::verification::check_verify>()
        .await?;

    celery
        .register_task::<tasks::kyc::create_applicant>()
        .await?;
    celery
        .register_task::<tasks::kyc::generate_sdk_token>()
        .await?;
    celery.register_task::<tasks::kyc::create_check>().await?;
    celery.register_task::<tasks::kyc::retrieve_check>().await?;

    celery
        .register_task::<tasks::kyc::upload_document>()
        .await?;
    celery
        .register_task::<tasks::kyc::upload_live_photo>()
        .await?;

    Ok(celery)
}

/// Run task-related "preflight" checks, which should cause Celery workers to
/// fail early if task dependencies are not met.
///
/// This should be called during worker startup.
pub async fn celery_worker_preflight_checks() -> Result<(), Box<dyn Error>> {
    tasks::verification::init_verify_client()?;
    Ok(())
}
