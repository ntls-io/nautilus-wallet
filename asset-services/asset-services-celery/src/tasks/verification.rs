use celery::task::TaskResult;
use twilio_verify::client::VerifyClient;
use twilio_verify::exports::{models, ApiError};
use twilio_verify::types::{CheckVerify, StartVerify};

use crate::exports::celery_prelude::TaskError;
use crate::task_records::callbacks::{save_failure, save_success};

/// Docs: <https://www.twilio.com/docs/verify/api/verification#verification-response-properties>
pub type VerificationResponse = models::VerifyV2ServiceVerification;

/// Send a verification code to a phone number using SMS.
///
/// This parses a free-form `phone_number` to E.164, or raises an unexpected task error.
#[celery::task(
    on_success = save_success,
    on_failure = save_failure,
)]
pub async fn start_verify(phone_number: String) -> TaskResult<VerificationResponse> {
    let phone_number = &phone_number;
    let client = init_verify_client()?;

    let start = StartVerify::phone_number_sms(phone_number).map_err(|parse_err| {
        TaskError::UnexpectedError(format!(
            "invalid phone_number {:?}: {}",
            phone_number, parse_err
        ))
    })?;
    client
        .start(client.start_params(start))
        .await
        .map_err(handle_api_error)
}

/// Docs: <https://www.twilio.com/docs/verify/api/verification-check#verificationcheck-response-properties>
pub type VerificationCheckResponse = models::VerifyV2ServiceVerificationCheck;

/// Check a received verification code.
#[celery::task]
pub async fn check_verify(sid: String, code: String) -> TaskResult<VerificationCheckResponse> {
    let client = init_verify_client()?;

    let check = CheckVerify::sid(sid, code);
    client
        .check(client.check_params(check))
        .await
        .map_err(handle_api_error)
}

pub(crate) fn init_verify_client() -> TaskResult<VerifyClient> {
    VerifyClient::from_env().map_err(|env_var_err| {
        TaskError::UnexpectedError(format!("init_verify_client failed: {}", env_var_err))
    })
}

fn handle_api_error<T>(err: ApiError<T>) -> TaskError {
    // TODO: Handle expected errors
    TaskError::UnexpectedError(format!("Twilio API call failed: {}", err))
}
