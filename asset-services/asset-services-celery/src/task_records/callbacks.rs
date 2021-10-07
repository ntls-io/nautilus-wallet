//! Task callbacks for saving result records.

use serde::Serialize;

use crate::exports::celery_prelude::{Task, TaskError};
use crate::task_records::redis_impl::RedisTaskRecords;
use crate::task_records::types::TaskRecord;

/// [`Task::on_success`] callback to save the returned value to [`RedisTaskRecords`].
///
/// # Panics
///
/// If saving fails.
pub async fn save_success<T>(task: &T, returned: &T::Returns)
where
    T: Task,
    T::Returns: Serialize,
{
    let record = &TaskRecord::from_task_success::<T>(returned).unwrap_or_else(|json_err| {
        panic!(
            "save_success: converting {:?} to JSON failed: {}",
            returned, json_err
        )
    });
    save(task, record).await;
}

/// [`Task::on_failure`] callback to save the failure to [`RedisTaskRecords`].
///
/// # Panics
///
/// If saving fails.
pub async fn save_failure(task: &impl Task, task_err: &TaskError) {
    let record = &TaskRecord::from_task_failure(task_err).unwrap_or_else(|json_err| {
        panic!(
            "save_failure: converting {:?} to JSON failed: {}",
            task_err, json_err
        )
    });
    save(task, record).await;
}

/// Helper: Save a task result record.
///
/// # Panics
///
/// If saving fails.
async fn save(task: &impl Task, record: &TaskRecord) {
    let mut store = RedisTaskRecords::from_env()
        .await
        .expect("RedisResultStore::from_env failed");
    store
        .save(task, record)
        .await
        .expect("RedisResultStore::record_result failed");
}
