//! Handler for [`tasks::misc::ping`].
//!
//! This is intended to exercise and troubleshoot the task queue.

use std::sync::Arc;
use std::time::Duration;

use asset_services_celery::celery_box::CeleryBox;
use asset_services_celery::exports::Signature;
use asset_services_celery::task_records::redis_impl::RedisTaskRecords;
use asset_services_celery::tasks;
use axum::{extract, Json};
use serde::{Deserialize, Serialize};

use crate::errors::AnyhowErrorResponse;

const DEFAULT_TIMEOUT: Duration = Duration::from_secs(5);

/// Arguments for [`tasks::misc::ping`].
#[derive(Clone, Debug)] // core
#[derive(Deserialize, Serialize)] // serde
pub(crate) struct PingRequest {
    payload: String,
    sleep_secs: Option<f64>,
    fail: Option<bool>,
}

/// Convert ping request to a task signature.
impl From<PingRequest> for Signature<tasks::misc::ping> {
    fn from(
        PingRequest {
            payload,
            sleep_secs,
            fail,
        }: PingRequest,
    ) -> Self {
        tasks::misc::ping::new(payload, sleep_secs, fail)
    }
}

/// Result from [`tasks::misc::ping`].
#[derive(Clone, Debug)] // core
#[derive(Deserialize, Serialize)] // serde
pub(crate) struct PingResponse {
    payload: String,
}

/// Call [`tasks::misc::ping`].
pub(crate) async fn ping(
    celery: extract::Extension<Arc<CeleryBox>>,
    Json(ping_request): Json<PingRequest>,
) -> Result<Json<PingResponse>, AnyhowErrorResponse> {
    // XXX: Connection per request.
    let payload = RedisTaskRecords::from_env()
        .await?
        .execute_task(celery.as_ref(), ping_request.into(), DEFAULT_TIMEOUT)
        .await?;
    Ok(Json(PingResponse { payload }))
}
