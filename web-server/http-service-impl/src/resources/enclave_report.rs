use actix_web::{error, get, web};

use crate::actors::CreateReportMessage;
use crate::server::AppState;

#[get("/enclave-report")]
pub(crate) async fn get_enclave_report(
    app_state: web::Data<AppState>,
) -> actix_web::Result<impl actix_web::Responder> {
    let message = CreateReportMessage {
        target_info: Default::default(),
    };
    let (report, enclave_data) = app_state
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
            error::ErrorInternalServerError(format!("enclave_create_report failed: {}", sgx_error))
        })?;
    Ok(format!(
        "ECALL success: mr_enclave={:?} enclave_data={:?}",
        report.body.mr_enclave.m, enclave_data
    ))
}
