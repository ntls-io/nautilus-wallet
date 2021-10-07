use std::time::Duration;

use tokio::time::sleep;

use crate::exports::celery_prelude::{TaskError, TaskResult};
use crate::task_records::callbacks::{save_failure, save_success};

#[celery::task(
    on_success = save_success,
    on_failure = save_failure,
)]
pub async fn ping(
    payload: String,
    sleep_secs: Option<f64>,
    fail: Option<bool>,
) -> TaskResult<String> {
    if let Some(sleep_secs) = sleep_secs {
        sleep(Duration::from_secs_f64(sleep_secs)).await;
    }
    if let Some(true) = fail {
        return Err(TaskError::UnexpectedError(payload));
    };

    Ok(payload)
}
