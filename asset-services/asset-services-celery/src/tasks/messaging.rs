use std::str::FromStr;

use twilio_api::client::MessagingClient;
use twilio_api::exports::{models, ApiError, PhoneNumber};

use crate::exports::celery_prelude::{TaskError, TaskResult};
use crate::task_records::callbacks::{save_failure, save_success};

/// Docs: <https://www.twilio.com/docs/sms/api/message-resource>
pub type Message = models::ApiV2010AccountMessage;

#[celery::task(
    on_success = save_success,
    on_failure = save_failure,
)]
pub async fn create_message(to_phone_number: String, body: String) -> TaskResult<Message> {
    let client = init_messaging_client()?;

    let to = PhoneNumber::from_str(&to_phone_number).map_err(|parse_err| {
        TaskError::UnexpectedError(format!(
            "invalid to_phone_number {:?}: {}",
            to_phone_number, parse_err
        ))
    })?;

    client
        .create_message(client.create_message_params(to, body))
        .await
        .map_err(handle_api_error)
}

pub(crate) fn init_messaging_client() -> TaskResult<MessagingClient> {
    MessagingClient::from_env().map_err(|env_var_err| {
        TaskError::UnexpectedError(format!("init_messaging_client failed: {}", env_var_err))
    })
}

fn handle_api_error<T>(err: ApiError<T>) -> TaskError {
    // TODO: Handle expected errors
    TaskError::UnexpectedError(format!("Twilio API call failed: {}", err))
}
