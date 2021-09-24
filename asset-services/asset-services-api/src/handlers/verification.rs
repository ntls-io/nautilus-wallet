use std::sync::Arc;

use asset_services_celery::celery_box::CeleryBox;
use asset_services_celery::tasks;
use axum::extract;
use serde::Deserialize;

use crate::errors::AnyhowErrorResponse;

#[derive(Deserialize)]
pub(crate) struct StartVerify {
    phone_number: String,
}

#[derive(Deserialize)]
pub(crate) struct CheckVerify {
    sid: String,
    code: String,
}

/// Send a verification code to a phone number.
///
/// See: [`tasks::verification::start_verify`]
pub(crate) async fn start_verify(
    extract::Extension(celery): extract::Extension<Arc<CeleryBox>>,
    extract::Json(StartVerify { phone_number }): extract::Json<StartVerify>,
) -> Result<String, AnyhowErrorResponse> {
    let sent = celery
        .send_task(tasks::verification::start_verify::new(phone_number))
        .await?;
    Ok(sent.task_id)
}

/// Check a received verification code.
///
/// Call [`tasks::verification::check_verify`]
pub(crate) async fn check_verify(
    extract::Extension(celery): extract::Extension<Arc<CeleryBox>>,
    extract::Json(CheckVerify { sid, code }): extract::Json<CheckVerify>,
) -> Result<String, AnyhowErrorResponse> {
    let sent = celery
        .send_task(tasks::verification::check_verify::new(sid, code))
        .await?;
    Ok(sent.task_id)
}
