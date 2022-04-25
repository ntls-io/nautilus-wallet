use std::prelude::v1::ToString;

use sgx_wallet_impl::ported::crypto::SodaBoxCrypto;
use sgx_wallet_impl::schema::actions::{
    OpenWallet,
    OpenWalletResult,
    WalletRequest,
    WalletResponse,
};
use sgx_wallet_impl::schema::sealing::{seal_msgpack, unseal_non_secret_msgpack};
use sgx_wallet_impl::wallet_operations::dispatch::wallet_operation_impl;

pub(crate) fn wallet_operation_sealing_works() {
    let client_crypto = &mut SodaBoxCrypto::from_seed([0; 32]);
    let enclave_crypto = SodaBoxCrypto::new();

    // Seal
    let wallet_request = &WalletRequest::OpenWallet(OpenWallet {
        wallet_id: "123456".to_string(),
        auth_pin: "1234".to_string(),
    });
    let sealed_request_bytes =
        &seal_msgpack(wallet_request, &enclave_crypto.get_pubkey(), client_crypto).unwrap();

    // Call
    let sealed_response_bytes = &wallet_operation_impl(sealed_request_bytes);

    // Unseal
    let unsealed_message: WalletResponse =
        unseal_non_secret_msgpack(sealed_response_bytes, client_crypto).unwrap();

    // Check
    assert_eq!(
        unsealed_message,
        OpenWalletResult::Failed(
            "key_from_id failed for wallet_id = \"123456\": decode error".to_string()
        )
        .into()
    );
}
