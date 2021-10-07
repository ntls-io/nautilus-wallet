use std::convert::TryFrom;
use std::time::SystemTime;

use chrono::{DateTime, Utc};
use serde::{Deserialize, Serialize};

use crate::exports::celery_prelude::{Task, TaskError, TaskResult};
use crate::exports::{JsonError, JsonValue};

#[derive(Clone, Eq, PartialEq, Debug)] // core
#[derive(Deserialize, Serialize)] // serde
#[serde(rename_all = "UPPERCASE")]
pub enum ResultStatus {
    Success,
    Failure,
}

/// A serializable record of a task's result.
///
/// This struct is an intermediate representation, with the task's result serialised to an untyped JSON value.
#[derive(Clone, Eq, PartialEq, Debug)] // core
#[derive(Deserialize, Serialize)] // serde
pub struct TaskRecord {
    pub status: ResultStatus,
    pub result: JsonValue,
    pub timestamp: DateTime<Utc>,
}

impl TaskRecord {
    /// Construct record with the current timestamp.
    pub(crate) fn new(status: ResultStatus, result: JsonValue) -> Self {
        Self {
            status,
            result,
            timestamp: now(),
        }
    }

    /// Construct record from a successful result of task `T`.
    pub(crate) fn from_task_success<T>(returned: &T::Returns) -> Result<Self, JsonError>
    where
        T: Task,
        T::Returns: Serialize,
    {
        let result = serde_json::to_value(returned)?;
        Ok(Self::new(ResultStatus::Success, result))
    }

    /// Construct record from a task failure.
    pub(crate) fn from_task_failure(err: &TaskError) -> Result<Self, JsonError> {
        let result = serde_json::to_value(err)?;
        Ok(TaskRecord::new(ResultStatus::Failure, result))
    }

    /// Convert record to a [`TaskResult`] for task `T`.
    ///
    /// Client code should use this to process task results.
    pub fn as_task_result<'de, T>(&'de self) -> Result<TaskResult<T::Returns>, JsonError>
    where
        T: Task,
        T::Returns: Deserialize<'de>,
    {
        Result::try_from(self)
    }
}

/// Convert a [`TaskRecord`] back to a [`Result`], for an arbitrary deserializable result type `R`.
impl<'de, R> TryFrom<&'de TaskRecord> for TaskResult<R>
where
    R: Deserialize<'de>,
{
    type Error = JsonError;

    fn try_from(value: &'de TaskRecord) -> Result<Self, Self::Error> {
        let TaskRecord { status, result, .. } = value;
        let result = match status {
            ResultStatus::Success => Ok(Deserialize::deserialize(result)?),
            ResultStatus::Failure => Err(Deserialize::deserialize(result)?),
        };
        Ok(result)
    }
}

/// Helper: The current time, matching how rusty-celery represents it.
fn now() -> DateTime<Utc> {
    DateTime::<Utc>::from(SystemTime::now())
}
