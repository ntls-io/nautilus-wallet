use actix_web::{error, get, web};

use crate::actors::CreateReportMessage;
use crate::resources::enclave_report::attestation_report::AttestationReport;
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

    let attestation_report = &AttestationReport {
        report: report.into(),
        enclave_public_key: enclave_data,
    };
    let response_body = rmp_serde::to_vec_named(attestation_report).map_err(|err| {
        error::ErrorInternalServerError(format!("failed to serialize AttestationReport: {}", err))
    })?;
    Ok(actix_web::HttpResponse::Ok()
        .content_type("application/x-msgpack")
        .body(response_body))
}

/// XXX: Stop-gap
mod attestation_report {
    use serde::{Deserialize, Serialize};
    use sgx_types::*;

    type PublicKey = [u8; 32];

    #[derive(Clone, Eq, PartialEq, Debug)] // core
    #[derive(Deserialize, Serialize)] // serde
    pub struct AttestationReport {
        pub report: SgxReport,
        pub enclave_public_key: PublicKey,
    }

    #[derive(Clone, Eq, PartialEq, Debug)] // core
    #[derive(Deserialize, Serialize)] // serde
    pub struct SgxReport {
        pub body: SgxReportBody,
        pub key_id: [uint8_t; SGX_KEYID_SIZE],
        pub mac: sgx_mac_t,
    }

    impl From<sgx_report_t> for SgxReport {
        fn from(report: sgx_report_t) -> Self {
            Self {
                body: report.body.into(),
                key_id: report.key_id.id,
                mac: report.mac,
            }
        }
    }

    #[derive(Clone, Eq, PartialEq, Debug)] // core
    #[derive(Deserialize, Serialize)] // serde
    pub struct SgxReportBody {
        pub cpu_svn: [uint8_t; SGX_CPUSVN_SIZE],
        pub isv_ext_prod_id: sgx_isvext_prod_id_t,
        pub attributes_flags: uint64_t,
        pub attributes_xfrm: uint64_t,
        pub mr_enclave: [uint8_t; SGX_HASH_SIZE],
        pub mr_signer: [uint8_t; SGX_HASH_SIZE],
        pub config_id: Box<[uint8_t]>, // XXX [uint8_t; SGX_CONFIGID_SIZE]
        pub isv_prod_id: sgx_prod_id_t,
        pub isv_svn: sgx_isv_svn_t,
        pub config_svn: sgx_config_svn_t,
        pub isv_family_id: sgx_isvfamily_id_t,
        pub report_data: Box<[uint8_t]>, // XXX [uint8_t; SGX_REPORT_DATA_SIZE]
    }

    impl From<sgx_report_body_t> for SgxReportBody {
        fn from(body: sgx_report_body_t) -> Self {
            Self {
                cpu_svn: body.cpu_svn.svn,
                isv_ext_prod_id: body.isv_ext_prod_id,
                attributes_flags: body.attributes.flags,
                attributes_xfrm: body.attributes.xfrm,
                mr_enclave: body.mr_enclave.m,
                mr_signer: body.mr_signer.m,
                config_id: body.config_id.into(),
                isv_prod_id: body.isv_prod_id,
                isv_svn: body.isv_svn,
                config_svn: body.config_svn,
                isv_family_id: body.isv_family_id,
                report_data: body.report_data.d.into(),
            }
        }
    }
}
