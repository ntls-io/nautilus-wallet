use sgx_tcrypto::rsgx_sha256_slice;
use sgx_types::sgx_target_info_t;
use sgx_wallet_impl::ported::attestation::create_report_impl;
use sgx_wallet_impl::ported::crypto::SodaBoxCrypto;

pub fn create_report_impl_works() {
    let expected_public_key = SodaBoxCrypto::new().get_pubkey();
    let expected_report_data = rsgx_sha256_slice(&expected_public_key).unwrap();

    let qe_target_info = &sgx_target_info_t::default();
    let (public_key, report) = create_report_impl(qe_target_info).unwrap();

    assert_eq!(public_key, expected_public_key);
    assert_eq!(report.body.report_data.d[..32], expected_report_data);
    // The rest should be zero.
    assert_eq!(report.body.report_data.d[32..], [0; 32]);
}
