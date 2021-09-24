//! Error representation helpers.

use axum::http::{Response, StatusCode};
use axum::response::IntoResponse;

/// Represent arbitrary errors as Axum Error responses using [`anyhow`].
#[repr(transparent)]
pub struct AnyhowErrorResponse(anyhow::Error);

/// Convert `E` → [`anyhow::Error`] → [`AnyhowErrorResponse`].
impl<E> From<E> for AnyhowErrorResponse
where
    E: Into<anyhow::Error>,
{
    fn from(err: E) -> Self {
        Self(err.into())
    }
}

/// Convert [`AnyhowErrorResponse`] → [`anyhow::Error`] → ([`StatusCode`], [`String`]) → [`Response`].
///
/// This will show an [`StatusCode::INTERNAL_SERVER_ERROR`] with an error message in [`anyhow::Error`]'s `{:#}` formatting.
impl IntoResponse for AnyhowErrorResponse {
    type Body = <(StatusCode, String) as IntoResponse>::Body;
    type BodyError = <(StatusCode, String) as IntoResponse>::BodyError;

    fn into_response(self) -> Response<Self::Body> {
        let AnyhowErrorResponse(err) = self;
        let message = format!("{:#}", err);
        (StatusCode::INTERNAL_SERVER_ERROR, message).into_response()
    }
}
