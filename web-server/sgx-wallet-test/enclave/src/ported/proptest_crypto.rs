use std::boxed::Box;
use std::format;

use proptest::prelude::*;
use secrecy::{ExposeSecret, Secret};
use sgx_wallet_impl::ported::crypto::SodaBoxCrypto;

/// Encrypt and decrypt a message using [`SodaBoxCrypto`].
pub(crate) fn prop_soda_box_roundtrips() {
    prop_soda_box_roundtrips_wrapper();
}

proptest! {
    fn prop_soda_box_roundtrips_wrapper(
        sender_seed: [u8; 32],
        receiver_seed: [u8; 32],
        plaintext: Box<[u8]>,
    ) {
        prop_assume!(sender_seed != receiver_seed);
        prop_soda_box_roundtrips_impl(sender_seed, receiver_seed, plaintext)?;
    }
}

fn prop_soda_box_roundtrips_impl(
    sender_seed: [u8; 32],
    receiver_seed: [u8; 32],
    plaintext: Box<[u8]>,
) -> Result<(), TestCaseError> {
    let mut sender = SodaBoxCrypto::from_seed(sender_seed);
    let receiver = SodaBoxCrypto::from_seed(receiver_seed);
    prop_assert_ne!(sender.get_pubkey(), receiver.get_pubkey());

    let encrypted = sender
        .encrypt_message(&Secret::new(plaintext.clone()), &receiver.get_pubkey())
        .unwrap();
    let decrypted = receiver
        .decrypt_message(
            &encrypted.ciphertext,
            &sender.get_pubkey(),
            &encrypted.nonce,
        )
        .unwrap();

    prop_assert_eq!(decrypted.expose_secret(), &plaintext);

    Ok(())
}
