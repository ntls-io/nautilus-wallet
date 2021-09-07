use actix_web::{error, post, web};

use crate::actors::WalletOperationMessage;
use crate::server::AppState;

#[post("/wallet-operation")]
pub(crate) async fn post_wallet_operation(
    app_state: web::Data<AppState>,
    request_body: web::Bytes,
) -> actix_web::Result<impl actix_web::Responder> {
    let sealed_request_bytes = request_body.to_vec().into_boxed_slice();
    let message = WalletOperationMessage {
        sealed_request_bytes,
    };
    let sealed_response_bytes = app_state
        .wallet_enclave_addr
        .send(message)
        .await
        .map_err(|mailbox_error| {
            error::ErrorInternalServerError(format!("Failed to reach actor: {:?}", mailbox_error))
        })?
        .map_err(|sgx_error| {
            error::ErrorInternalServerError(format!("Failed to call enclave: {:?}", sgx_error))
        })?
        .map_err(|sgx_error| {
            error::ErrorInternalServerError(format!("wallet_operation failed: {}", sgx_error))
        })?;
    let response_body = sealed_response_bytes.into_vec();
    Ok(actix_web::HttpResponse::Ok()
        .content_type("application/x-msgpack")
        .body(response_body))
}
