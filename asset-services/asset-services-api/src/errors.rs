//! Error representation helpers.

use asset_services_celery::exports::celery_prelude::CeleryError;
use axum::http::{Response, StatusCode};
use axum::response::IntoResponse;

/// Map Celery errors to Internal Server Error responses.
pub struct CeleryErrorResponse(CeleryError);

impl From<CeleryError> for CeleryErrorResponse {
    fn from(err: CeleryError) -> Self {
        CeleryErrorResponse(err)
    }
}

impl IntoResponse for CeleryErrorResponse {
    type Body = <(StatusCode, String) as IntoResponse>::Body;
    type BodyError = <(StatusCode, String) as IntoResponse>::BodyError;

    fn into_response(self) -> Response<Self::Body> {
        let CeleryErrorResponse(err) = self;
        let message = format!("Celery error: {}", err.to_string());
        (StatusCode::INTERNAL_SERVER_ERROR, message).into_response()
    }
}
