//! Helpers for running processes that interact with a Celery task queue.

use std::{env, io};

use celery::error::CeleryError;

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

/// Initialise a [`Celery`] app instance with the broker specified by the `BROKER_URL` environment variable.
pub async fn init_celery_from_env() -> Result<CeleryBox, CeleryError> {
    let broker_url = env::var("BROKER_URL").map_err(|var_err| {
        io::Error::new(
            io::ErrorKind::InvalidInput,
            format!("invalid BROKER_URL: {}", var_err),
        )
    })?;
    init_celery_app(&broker_url).await
}

/// Initialise a [`Celery`] app instance with the specified broker.
pub async fn init_celery_app(broker_url: &str) -> Result<CeleryBox, CeleryError> {
    // The name "celery" matches the default value of the celery::app! macro.
    let celery = CeleryBox::build("celery", broker_url).await?;

    // Register our tasks:
    celery.register_task::<tasks::ping>().await?;

    Ok(celery)
}
