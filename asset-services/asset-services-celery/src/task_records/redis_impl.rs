//! Redis-based [`TaskRecord`] storage.

use std::io;
use std::time::Duration;

use env_var_helpers::env_vars;
use redis::aio::Connection;
use redis::{Client, RedisError, RedisResult};
use serde::de::DeserializeOwned;
use thiserror::Error;

use crate::celery_box::CeleryBox;
use crate::exports::celery_prelude::{CeleryError, Task, TaskError};
use crate::exports::{JsonError, Signature};
use crate::task_records::redis_helper::{ListSide, RedisHelper};
use crate::task_records::types::{ResultStatus, TaskRecord};

/// Poor person's Celery result persistence.
///
/// This uses Redis's <https://redis.io/commands/lmove#pattern-reliable-queue> pattern
/// to achieve reliable concurrent synchronisation between saving and retrieving records,
/// with an additional modification:
///
/// - To save, push successes on the left, and failures on the right.
/// - To retrieve, read from the left.
///
/// This ensures that [`RedisTaskRecords::retrieve`] will return the most recent successful record,
/// or the first failure.
pub struct RedisTaskRecords {
    pub redis: RedisHelper,
}

impl RedisTaskRecords {
    pub fn new(connection: Connection) -> Self {
        Self {
            redis: RedisHelper::new(connection),
        }
    }

    /// Connect to Redis at `BROKER_URL`.
    ///
    /// Fails if `BROKER_URL` is not a valid Redis URL.
    pub async fn from_env() -> RedisResult<Self> {
        let broker_url = env_vars::var("BROKER_URL").map_err(io::Error::from)?;
        let client = Client::open(broker_url)?;
        let connection = client.get_async_connection().await?;
        let store = RedisTaskRecords::new(connection);
        Ok(store)
    }

    /// Save a record.
    ///
    /// This will fulfil any waiting [`Self::retrieve`] operations.
    pub async fn save(
        &mut self,
        task: &impl Task,
        record: &TaskRecord,
    ) -> Result<(), RecordSaveError> {
        let key = key_for_task(task);
        let value = serde_json::to_string(record)?;
        // Push success into left, failure into right.
        let side = match record.status {
            ResultStatus::Success => ListSide::Left,
            ResultStatus::Failure => ListSide::Right,
        };
        self.redis.push(side, key, value).await?;
        Ok(())
    }

    /// Retrieve a saved record, waiting for it if necessary.
    ///
    /// If `task_id` has a [`TaskRecord`], return it immediately, giving precedence to successful results.
    ///
    /// If `task_id` has no [`TaskRecord`], wait for a [`Self::save`] operation to save one.
    ///
    /// On timeout, return `None`.
    ///
    /// A timeout of [`Duration::ZERO`] waits indefinitely.
    pub async fn retrieve(
        &mut self,
        task_id: impl AsRef<str>,
        timeout: Duration,
    ) -> Result<TaskRecord, RecordRetrieveError> {
        let key = &key_for_task_id(task_id.as_ref());

        // Get the latest (hopefully successful) TaskRecord.
        use ListSide::Left;
        let retrieved = self
            .redis
            .blmove(key, key, Left, Left, timeout)
            .await?
            .ok_or(RecordRetrieveError::TimedOut)?;

        // Deserialize the TaskRecord
        let task_record = serde_json::from_str(retrieved.as_str())?;
        Ok(task_record)
    }

    /// Convenience helper: Send a task and retrieve its result.
    pub async fn execute_task<T>(
        &mut self,
        celery: &CeleryBox,
        task_sig: Signature<T>,
        timeout: Duration,
    ) -> Result<T::Returns, TaskExecuteError>
    where
        T: Task,
        T::Returns: DeserializeOwned,
    {
        let sent = celery.send_task(task_sig).await?;
        let task_record = self.retrieve(sent.task_id, timeout).await?;
        let task_result = task_record.as_task_result::<T>()?;
        let returned = task_result?;
        Ok(returned)
    }
}

/// Helper: Redis task record key for a task.
fn key_for_task(task: &impl Task) -> String {
    let request = task.request();
    let task_id = request.id.as_str();
    key_for_task_id(task_id)
}

/// Helper: Redis task record key for a task ID.
fn key_for_task_id(task_id: &str) -> String {
    format!("celery-task-record-{}", task_id)
}

/// [`RedisTaskRecords::save`] failed.
#[derive(Debug, Error)]
pub enum RecordSaveError {
    #[error("Redis operation failed")]
    RedisError(#[from] RedisError),
    #[error("failed to serialize TaskRecord")]
    SerializeError(#[from] JsonError),
}

/// [`RedisTaskRecords::retrieve`] failed.
#[derive(Debug, Error)]
pub enum RecordRetrieveError {
    #[error("Redis operation failed")]
    RedisError(#[from] RedisError),
    #[error("timed out retrieving record")]
    TimedOut,
    #[error("failed to deserialize TaskRecord")]
    DeserializeError(#[from] JsonError),
}

/// [`RedisTaskRecords::execute_task`] failed.
#[derive(Debug, Error)]
pub enum TaskExecuteError {
    #[error("failed to send task to Celery")]
    Send(#[from] CeleryError),
    #[error("failed to retrieve TaskRecord")]
    Retrieve(#[from] RecordRetrieveError),
    #[error("failed to deserialize TaskResult")]
    DeserializeError(#[from] JsonError),
    #[error("task failed")]
    TaskError(#[from] TaskError),
}
