use std::boxed::Box;

use proptest::prelude::*;
use secrecy::{ExposeSecret, Secret};
use sgx_wallet_impl::ported::crypto::{SecretBytes, SodaBoxCrypto};
use sgx_wallet_impl::schema::sealing::{seal, seal_msgpack, unseal, unseal_msgpack};

/// Roundtrip with [`seal`] and then [`unseal`].
pub(crate) fn prop_seal_unseal_roundtrips() {
    proptest!(|(message: Box<[u8]>, sender_seed: [u8; 32], receiver_seed: [u8; 32])| {
        prop_assume!(sender_seed != receiver_seed);
        prop_seal_unseal_roundtrips_impl(message, sender_seed, receiver_seed);
    });
}

fn prop_seal_unseal_roundtrips_impl(
    message: Box<[u8]>,
    sender_seed: [u8; 32],
    receiver_seed: [u8; 32],
) {
    let message = &SecretBytes::new(message);
    let sender = &mut SodaBoxCrypto::from_seed(sender_seed);
    let receiver = &SodaBoxCrypto::from_seed(receiver_seed);
    assert_ne!(sender.get_pubkey(), receiver.get_pubkey());

    let sealed = &seal(message, &receiver.get_pubkey(), sender).unwrap();
    let unsealed = &unseal(sealed, receiver).unwrap();

    assert_eq!(unsealed.expose_secret(), message.expose_secret());
}

type TestMessage = Box<[i32]>;

/// Roundtrip with [`seal_msgpack`] and then [`unseal_msgpack`].
pub(crate) fn prop_seal_unseal_msgpack_roundtrips() {
    proptest!(|(message: TestMessage, sender_seed: [u8; 32], receiver_seed: [u8; 32])| {
        prop_assume!(sender_seed != receiver_seed);
        prop_seal_unseal_msgpack_roundtrips_impl(message, sender_seed, receiver_seed);
    });
}

fn prop_seal_unseal_msgpack_roundtrips_impl(
    message: TestMessage,
    sender_seed: [u8; 32],
    receiver_seed: [u8; 32],
) {
    let message = &Secret::new(message);
    let sender = &mut SodaBoxCrypto::from_seed(sender_seed);
    let receiver = &SodaBoxCrypto::from_seed(receiver_seed);
    assert_ne!(sender.get_pubkey(), receiver.get_pubkey());

    let sealed = &seal_msgpack(message.expose_secret(), &receiver.get_pubkey(), sender).unwrap();
    let unsealed = &unseal_msgpack::<TestMessage>(sealed, receiver).unwrap();

    assert_eq!(unsealed.expose_secret(), message.expose_secret());
}
