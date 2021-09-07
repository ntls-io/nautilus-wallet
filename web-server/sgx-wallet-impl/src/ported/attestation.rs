use sgx_tcrypto::rsgx_sha256_slice;
use sgx_tse::rsgx_create_report;
use sgx_types::{sgx_report_data_t, sgx_report_t, sgx_target_info_t, SgxResult};

use crate::ported::crypto::{PublicKey, SodaBoxCrypto};

/// XXX see `rtc_tenclave::enclave::create_report_impl`
pub fn create_report_impl(
    qe_target_info: &sgx_target_info_t,
) -> SgxResult<(PublicKey, sgx_report_t)> {
    let crypto = SodaBoxCrypto::new();
    let pubkey = crypto.get_pubkey();

    let pubkey_hash = rsgx_sha256_slice(&pubkey)?;

    let mut p_data = sgx_report_data_t::default();
    p_data.d[0..32].copy_from_slice(&pubkey_hash);

    let report = rsgx_create_report(qe_target_info, &p_data)?;
    Ok((pubkey, report))
}
