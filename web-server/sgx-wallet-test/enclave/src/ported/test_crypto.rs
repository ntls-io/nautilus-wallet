//! XXX see `rtc_tenclave::crypto`

use std::ops::Deref;
use std::vec;

use secrecy::{ExposeSecret, Secret};
use sgx_wallet_impl::ported::crypto::{
    SodaBoxCrypto,
    CRYPTO_BOX_BOXZEROBYTES,
    CRYPTO_BOX_ZEROBYTES,
};

pub(crate) fn get_test_keypair(
    seed: &[u8; 32],
) -> (sodalite::BoxPublicKey, sodalite::BoxSecretKey) {
    let mut pub_key = sodalite::BoxPublicKey::default();
    let mut secret_key = sodalite::BoxSecretKey::default();
    sodalite::box_keypair_seed(&mut pub_key, &mut secret_key, seed);
    (pub_key, secret_key)
}

pub fn soda_box_decrypt_works() {
    let message = vec![83_u8; 432];
    let plaintext = [vec![0_u8; CRYPTO_BOX_ZEROBYTES], message.clone()].concat();
    let (pub_key, secret_key) = get_test_keypair(&[32_u8; 32]);
    let mut ciphertext = vec![0_u8; plaintext.len()];
    let nonce = [32_u8; sodalite::BOX_NONCE_LEN];

    let sut = SodaBoxCrypto::new();

    sodalite::box_(
        &mut ciphertext,
        &plaintext,
        &nonce,
        &sut.get_pubkey(),
        &secret_key,
    )
    .unwrap();

    let result = sut.decrypt_message(&ciphertext[CRYPTO_BOX_BOXZEROBYTES..], &pub_key, &nonce);
    assert!(result.is_ok());
    assert_eq!(
        result.unwrap().expose_secret().deref(),
        &message,
        "decrypt_message result: got left, expected right"
    )
}

pub fn soda_box_encrypt_works() {
    let message = vec![83_u8; 432];
    let (pub_key, secret_key) = get_test_keypair(&[32_u8; 32]);

    let mut sut = SodaBoxCrypto::new();

    let result = sut
        .encrypt_message(&Secret::new(message.clone().into_boxed_slice()), &pub_key)
        .unwrap();
    let ciphertext = [
        vec![0_u8; CRYPTO_BOX_BOXZEROBYTES],
        result.ciphertext.into(),
    ]
    .concat();
    let mut plaintext = vec![0_u8; ciphertext.len()];

    sodalite::box_open(
        &mut plaintext,
        &ciphertext,
        &result.nonce,
        &sut.get_pubkey(),
        &secret_key,
    )
    .unwrap();
    let result_decrypted = &plaintext[CRYPTO_BOX_ZEROBYTES..];

    assert_eq!(
        &result_decrypted, &message,
        "encrypt_message result: decrypts to left, expected right"
    )
}
