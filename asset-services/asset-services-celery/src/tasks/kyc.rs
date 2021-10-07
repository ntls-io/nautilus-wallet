//! Onfido KYC tasks.

use std::error::Error;

use onfido::client::{api_error_response, OnfidoClient};
pub use onfido::exports::models::{Applicant, Document, LivePhoto};
use onfido::exports::{models, ApiError, CountryCode};
use onfido::types::{CreatedApplicant, DocumentSide, DocumentType};
use serde::Serialize;

use crate::exports::celery_prelude::{TaskError, TaskResult};
use crate::task_records::callbacks::{save_failure, save_success};

/// Wrap [`OnfidoClient::create_applicant`].
#[celery::task(
    on_success = save_success,
    on_failure = save_failure,
)]
pub async fn create_applicant(
    first_name: String,
    last_name: String,
) -> TaskResult<CreatedApplicant> {
    let client = init_onfido_client()?;
    client
        .create_applicant(client.create_applicant_param(first_name, last_name))
        .await
        .map_err(handle_api_error)
}

/// Wrap [`OnfidoClient::generate_sdk_token`].
#[celery::task(
    on_success = save_success,
    on_failure = save_failure,
)]
pub async fn generate_sdk_token(applicant_id: String) -> TaskResult<String> {
    let client = init_onfido_client()?;
    client
        .generate_sdk_token(applicant_id)
        .await
        .map_err(handle_api_error)
}

/// Re-export, for now.
pub type Check = models::Check;

/// Wrap [`OnfidoClient::create_check`].
#[celery::task(
    on_success = save_success,
    on_failure = save_failure,
)]
pub async fn create_check(
    applicant_id: String,
    report_names: Vec<String>,
) -> TaskResult<models::Check> {
    let client = init_onfido_client()?;
    client
        .create_check(client.create_check_param(applicant_id, report_names))
        .await
        .map_err(handle_api_error)
}

/// Wrap [`OnfidoClient::retrieve_check`].
#[celery::task(
    on_success = save_success,
    on_failure = save_failure,
)]
pub async fn retrieve_check(check_id: String) -> TaskResult<models::Check> {
    let client = init_onfido_client()?;
    client
        .retrieve_check(check_id)
        .await
        .map_err(handle_api_error)
}

/// Wrap [`OnfidoClient::upload_document`].
#[celery::task(
    on_success = save_success,
    on_failure = save_failure,
)]
pub async fn upload_document(
    applicant_id: String,
    document_type: DocumentType,
    file: Vec<u8>,
    document_side: Option<DocumentSide>,
    issuing_country: Option<CountryCode>,
) -> TaskResult<Document> {
    init_onfido_client()?
        .upload_document(
            applicant_id,
            document_type,
            file,
            document_side,
            issuing_country,
        )
        .await
        .map_err(handle_api_error)
}

/// Wrap [`OnfidoClient::upload_live_photo`].
#[celery::task(
    on_success = save_success,
    on_failure = save_failure,
)]
pub async fn upload_live_photo(
    applicant_id: String,
    file: Vec<u8>,
    advanced_validation: Option<bool>,
) -> TaskResult<LivePhoto> {
    init_onfido_client()?
        .upload_live_photo(applicant_id, file, advanced_validation)
        .await
        .map_err(handle_api_error)
}

pub(crate) fn init_onfido_client() -> TaskResult<OnfidoClient> {
    OnfidoClient::from_env().map_err(|env_var_err| {
        TaskError::UnexpectedError(format!("init_onfido_client failed: {}", env_var_err))
    })
}

fn handle_api_error<T>(api_err: ApiError<T>) -> TaskError
where
    ApiError<T>: Error + Send + Sync + 'static,
    T: Clone + Serialize,
{
    // FIXME: Reporting the error's response content is way more involved than it should be.
    let extra = match api_error_response(&api_err) {
        None => "".to_string(),
        Some(response) => {
            let entity = response
                .entity
                .map(|entity| {
                    let value = &serde_json::to_value(entity).expect("FIXME");
                    serde_json::to_string_pretty(value).expect("FIXME")
                })
                .unwrap_or_else(|| "None".to_string());
            format!(
                "\
                    \n\nresponse status: {}\
                    \n\nresponse content: {}\
                    \n\nresponse entity: {}\
                ",
                response.status, response.content, entity
            )
        }
    };
    let err = anyhow::Error::from(api_err);
    TaskError::UnexpectedError(format!("Onfido API call failed: {:#}{}", err, extra))
}
