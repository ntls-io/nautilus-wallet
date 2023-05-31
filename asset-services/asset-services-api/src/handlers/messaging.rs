//! Handlers for [`tasks::messaging`].

use std::sync::Arc;
use std::time::Duration;

use asset_services_celery::celery_box::CeleryBox;
use asset_services_celery::exports::Signature;
use asset_services_celery::task_records::redis_impl::RedisTaskRecords;
use asset_services_celery::tasks;
use asset_services_celery::tasks::messaging::Message;
use axum::{extract, Json};
use serde::Deserialize;

use crate::errors::AnyhowErrorResponse;

const DEFAULT_TIMEOUT: Duration = Duration::from_secs(10);

#[derive(Deserialize)]
pub(crate) struct CreateMessage {
    to_phone_number: String,
    body: String,
}

// TODO: FetchMessage (if needed?)

// Convert requests to task signatures:

impl From<CreateMessage> for Signature<tasks::messaging::create_message> {
    fn from(
        CreateMessage {
            to_phone_number,
            body,
        }: CreateMessage,
    ) -> Self {
        tasks::messaging::create_message::new(to_phone_number, body)
    }
}

/// Send a verification code to a phone number.
///
/// FIXME: This needs client authentication to avoid being an open relay.
///
/// See: [`tasks::messaging::create_message`]
pub(crate) async fn create_message(
    extract::Extension(celery): extract::Extension<Arc<CeleryBox>>,
    Json(create_message): Json<CreateMessage>,
) -> Result<Json<Message>, AnyhowErrorResponse> {
    // XXX: Connection per request.
    let verification_response = RedisTaskRecords::from_env()
        .await?
        .execute_task(celery.as_ref(), create_message.into(), DEFAULT_TIMEOUT)
        .await?;
    Ok(Json(verification_response))
}
