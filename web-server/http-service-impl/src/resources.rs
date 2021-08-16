use actix_web::web::Data;
use actix_web::{error, get, Responder};

use crate::actors::CreateReport;
use crate::server::AppState;

#[get("/enclave-report")]
pub(crate) async fn enclave_report(app_state: Data<AppState>) -> actix_web::Result<impl Responder> {
    let message = CreateReport {
        target_info: Default::default(),
    };
    let (report, enclave_data) = app_state
        .wallet_enclave_addr
        .send(message)
        .await
        .map_err(|mailbox_error| error::ErrorInternalServerError(mailbox_error))?
        .map_err(|sgx_error| error::ErrorInternalServerError(sgx_error))?
        .map_err(|sgx_error| error::ErrorInternalServerError(sgx_error))?;
    Ok(format!(
        "ECALL success: mr_enclave={:?} enclave_data={:?}",
        report.body.mr_enclave.m, enclave_data
    ))
}
