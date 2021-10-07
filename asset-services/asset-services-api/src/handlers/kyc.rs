use std::sync::Arc;
use std::time::Duration;

use asset_services_celery::celery_box::CeleryBox;
use asset_services_celery::task_records::redis_impl::RedisTaskRecords;
use asset_services_celery::tasks;
use asset_services_celery::tasks::kyc::Check;
use axum::{extract, Json};
use serde::{Deserialize, Serialize};

use crate::errors::AnyhowErrorResponse;

const DEFAULT_TIMEOUT: Duration = Duration::from_secs(5);

/// Request for [`start_kyc`].
#[derive(Deserialize)]
pub(crate) struct StartKyc {
    first_name: String,
    last_name: String,
}

/// Response of [`start_kyc`].
#[derive(Serialize)]
pub(crate) struct OnfidoKycStarted {
    applicant_id: String,
    sdk_token: String,
}

/// Request for [`create_check`].
#[derive(Deserialize)]
pub(crate) struct CreateCheck {
    applicant_id: String,
    report_names: Vec<String>,
}

/// Request for [`retrieve_check`].
#[derive(Deserialize)]
pub(crate) struct RetrieveCheck {
    check_id: String,
}

/// Start the Onfido KYC process.
///
/// This will create an applicant, and generate an input-capture SDK token.
pub(crate) async fn start_kyc(
    extract::Extension(celery): extract::Extension<Arc<CeleryBox>>,
    Json(StartKyc {
        first_name,
        last_name,
    }): Json<StartKyc>,
) -> Result<Json<OnfidoKycStarted>, AnyhowErrorResponse> {
    // XXX: Connection per request.
    let mut task_records = RedisTaskRecords::from_env().await?;

    let applicant = task_records
        .execute_task(
            celery.as_ref(),
            tasks::kyc::create_applicant::new(first_name, last_name),
            DEFAULT_TIMEOUT,
        )
        .await?;
    let sdk_token = task_records
        .execute_task(
            celery.as_ref(),
            tasks::kyc::generate_sdk_token::new(applicant.id.clone()),
            DEFAULT_TIMEOUT,
        )
        .await?;

    Ok(Json(OnfidoKycStarted {
        applicant_id: applicant.id,
        sdk_token,
    }))
}

/// Call [`tasks::kyc::create_check`].
pub(crate) async fn create_check(
    extract::Extension(celery): extract::Extension<Arc<CeleryBox>>,
    Json(CreateCheck {
        applicant_id,
        report_names,
    }): Json<CreateCheck>,
) -> Result<Json<Check>, AnyhowErrorResponse> {
    // XXX: Connection per request.
    let check = RedisTaskRecords::from_env()
        .await?
        .execute_task(
            celery.as_ref(),
            tasks::kyc::create_check::new(applicant_id, report_names),
            DEFAULT_TIMEOUT,
        )
        .await?;
    Ok(Json(check))
}

/// Call [`tasks::kyc::retrieve_check`].
pub(crate) async fn retrieve_check(
    extract::Extension(celery): extract::Extension<Arc<CeleryBox>>,
    Json(RetrieveCheck { check_id }): Json<RetrieveCheck>,
) -> Result<Json<Check>, AnyhowErrorResponse> {
    // XXX: Connection per request.
    let check = RedisTaskRecords::from_env()
        .await?
        .execute_task(
            celery.as_ref(),
            tasks::kyc::retrieve_check::new(check_id),
            DEFAULT_TIMEOUT,
        )
        .await?;
    Ok(Json(check))
}
