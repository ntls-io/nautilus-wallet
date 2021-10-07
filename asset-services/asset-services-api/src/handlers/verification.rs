use std::sync::Arc;
use std::time::Duration;

use asset_services_celery::celery_box::CeleryBox;
use asset_services_celery::exports::Signature;
use asset_services_celery::task_records::redis_impl::RedisTaskRecords;
use asset_services_celery::tasks;
use asset_services_celery::tasks::verification::{VerificationCheckResponse, VerificationResponse};
use axum::{extract, Json};
use serde::Deserialize;

use crate::errors::AnyhowErrorResponse;

const DEFAULT_TIMEOUT: Duration = Duration::from_secs(5);

#[derive(Deserialize)]
pub(crate) struct StartVerify {
    phone_number: String,
}

#[derive(Deserialize)]
pub(crate) struct CheckVerify {
    sid: String,
    code: String,
}

// Convert requests to task signatures:

impl From<StartVerify> for Signature<tasks::verification::start_verify> {
    fn from(StartVerify { phone_number }: StartVerify) -> Self {
        tasks::verification::start_verify::new(phone_number)
    }
}

impl From<CheckVerify> for Signature<tasks::verification::check_verify> {
    fn from(CheckVerify { sid, code }: CheckVerify) -> Self {
        tasks::verification::check_verify::new(sid, code)
    }
}

/// Send a verification code to a phone number.
///
/// See: [`tasks::verification::start_verify`]
pub(crate) async fn start_verify(
    extract::Extension(celery): extract::Extension<Arc<CeleryBox>>,
    Json(start_verify): Json<StartVerify>,
) -> Result<Json<VerificationResponse>, AnyhowErrorResponse> {
    // XXX: Connection per request.
    let verification_response = RedisTaskRecords::from_env()
        .await?
        .execute_task(celery.as_ref(), start_verify.into(), DEFAULT_TIMEOUT)
        .await?;
    Ok(Json(verification_response))
}

/// Check a received verification code.
///
/// Call [`tasks::verification::check_verify`]
pub(crate) async fn check_verify(
    extract::Extension(celery): extract::Extension<Arc<CeleryBox>>,
    extract::Json(check_verify): extract::Json<CheckVerify>,
) -> Result<Json<VerificationCheckResponse>, AnyhowErrorResponse> {
    // XXX: Connection per request.
    let verification_check_response = RedisTaskRecords::from_env()
        .await?
        .execute_task(celery.as_ref(), check_verify.into(), DEFAULT_TIMEOUT)
        .await?;
    Ok(Json(verification_check_response))
}
