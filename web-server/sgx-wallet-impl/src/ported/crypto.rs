//! XXX see `rtc_tenclave::crypto`

use std::boxed::Box;
use std::vec;
use std::vec::Vec;

use rand::{Rng, RngCore};
use secrecy::{ExposeSecret, Secret, Zeroize};
use sgx_tse::{rsgx_get_key, rsgx_self_report};
use sgx_types::*;
use thiserror::Error;

/// XXX see `rtc_types::EncryptedMessage`
#[derive(Clone, Debug)]
pub struct EncryptedMessage {
    pub ciphertext: Box<[u8]>,
    pub nonce: [u8; 24],
}

/// XXX see `rtc_types::CryptoError`
#[derive(Copy, Clone, PartialEq, Eq, Ord, PartialOrd, Debug, Error)]
pub enum CryptoError {
    #[error("Crypto rng error: {}", .0)]
    Rand(u32),
    #[error("Unknown crypto error")]
    Unknown,
}

pub(crate) type PublicKey = [u8; 32];
type PrivateKey = Secret<[u8; 32]>;
pub(crate) type Nonce = [u8; 24];

// FIXME: sodalite should expose these padding constants.
// Values referenced from https://tweetnacl.cr.yp.to/20140427/tweetnacl.h

/// C NaCl Box API: Zero padding for plaintext.
pub const CRYPTO_BOX_ZEROBYTES: usize = 32;

/// C NaCl Box API: Zero padding for ciphertext.
pub const CRYPTO_BOX_BOXZEROBYTES: usize = 16;

pub type SecretBytes = Secret<Box<[u8]>>;

pub struct SodaBoxCrypto {
    public_key: PublicKey,
    private_key: PrivateKey,
    rng: Box<dyn RngCore>,
}

impl Default for SodaBoxCrypto {
    fn default() -> Self {
        SodaBoxCrypto::new()
    }
}

impl SodaBoxCrypto {
    pub fn new() -> Self {
        let enclave_key = get_enclave_key();
        let mut seed = [0_u8; 32];
        let (left, right) = seed.split_at_mut(16);

        // This should never panic since the file_key is size 16
        // TODO: Guard against the panics
        left.copy_from_slice(enclave_key.expose_secret());
        right.copy_from_slice(enclave_key.expose_secret());

        SodaBoxCrypto::from_seed(seed)
    }

    pub fn from_seed(mut seed: [u8; 32]) -> Self {
        let mut pub_key = [0_u8; 32];
        let mut priv_key = [0_u8; 32];

        // TODO: Create a PR to make the requirement for seed broader if possible
        sodalite::box_keypair_seed(&mut pub_key, &mut priv_key, &seed);

        // Zero copies of enclave key
        seed.zeroize();
        Self {
            public_key: pub_key,
            private_key: Secret::new(priv_key),
            rng: Box::new(rand::thread_rng()),
        }
    }

    pub fn decrypt_message(
        &self,
        ciphertext: &[u8],
        their_pk: &PublicKey,
        nonce: &Nonce,
    ) -> Result<SecretBytes, CryptoError> {
        // It is the responsibility of the caller to pad ciphertext
        // see: https://github.com/registreerocks/rtc-data/issues/51
        let padded_ciphertext = &[&[0u8; CRYPTO_BOX_BOXZEROBYTES] as &[u8], ciphertext].concat();
        let mut message = vec![0_u8; padded_ciphertext.len()];

        // Docs: https://nacl.cr.yp.to/box.html
        //
        // "The caller must ensure, before calling the crypto_box_open function,
        // that the first crypto_box_BOXZEROBYTES bytes of the ciphertext c are all 0.
        // The crypto_box_open function ensures (in case of success) that
        // the first crypto_box_ZEROBYTES bytes of the plaintext m are all 0."
        //
        match sodalite::box_open(
            &mut message,
            padded_ciphertext,
            nonce,
            their_pk,
            self.private_key.expose_secret(),
        ) {
            Ok(_) => Ok(Secret::new(
                drop_prefix(CRYPTO_BOX_ZEROBYTES, message).into_boxed_slice(),
            )),
            // TODO: return compound error type
            Err(_) => Err(CryptoError::Unknown),
        }
    }

    pub fn encrypt_message(
        &mut self,
        message: &SecretBytes,
        their_pk: &PublicKey,
    ) -> Result<EncryptedMessage, CryptoError> {
        let nonce = self.get_nonce()?;
        // Length is padded here since the message needs to be padded with 32 `0_u8`
        // at the front
        let mut ciphertext = vec![0_u8; message.expose_secret().len() + CRYPTO_BOX_ZEROBYTES];

        // Docs: https://nacl.cr.yp.to/box.html
        //
        // "The caller must ensure, before calling the C NaCl crypto_box function,
        // that the first crypto_box_ZEROBYTES bytes of the message m are all 0.
        // The crypto_box function ensures that the first crypto_box_BOXZEROBYTES
        // bytes of the ciphertext c are all 0."
        //
        match sodalite::box_(
            &mut ciphertext,
            &[
                &[0u8; CRYPTO_BOX_ZEROBYTES] as &[u8],
                message.expose_secret(),
            ]
            .concat(),
            &nonce,
            their_pk,
            self.private_key.expose_secret(),
        ) {
            Ok(_) => Ok(EncryptedMessage {
                ciphertext: drop_prefix(CRYPTO_BOX_BOXZEROBYTES, ciphertext).into_boxed_slice(),
                nonce,
            }),
            Err(_) => Err(CryptoError::Unknown),
        }
    }

    pub fn get_pubkey(&self) -> PublicKey {
        self.public_key
    }

    fn get_nonce(&mut self) -> Result<Nonce, CryptoError> {
        let mut nonce = [0_u8; 24];
        // TODO: don't use just random nonces, since it might not
        // be applicable to all situations
        match self.rng.try_fill(&mut nonce) {
            Ok(_) => Ok(nonce),
            // TODO: Better conversion from rand::Error? (See also data_upload.rs)
            Err(err) => Err(CryptoError::Rand(err.code().map_or(0, |code| code.get()))),
        }
    }
}

pub(crate) fn sgx_get_key_helper(
    key_id: Option<sgx_key_id_t>,
    key_name: uint16_t,
    key_policy: uint16_t,
) -> sgx_key_128bit_t {
    // From my testing, this is deterministic if the environment and binary is the same
    // TODO: Test in Azure VM using HW mode
    // TODO: Find documentation that confirms that the effect is normative
    let report = rsgx_self_report();

    let attribute_mask = sgx_attributes_t {
        flags: TSEAL_DEFAULT_FLAGSMASK,
        xfrm: 0,
    };
    let key_id = match key_id {
        None => sgx_key_id_t::default(),
        Some(id) => id,
    };

    let key_request = sgx_key_request_t {
        key_name,
        key_policy,
        isv_svn: report.body.isv_svn,
        reserved1: 0_u16,
        cpu_svn: report.body.cpu_svn,
        attribute_mask,
        key_id,
        misc_mask: TSEAL_DEFAULT_MISCMASK,
        config_svn: report.body.config_svn,
        reserved2: [0_u8; SGX_KEY_REQUEST_RESERVED2_BYTES],
    };

    // This should never fail since the input values are constant
    // TODO: remove unwrap and deal with error?
    rsgx_get_key(&key_request).unwrap()
}

pub fn get_enclave_key() -> Secret<sgx_key_128bit_t> {
    Secret::new(sgx_get_key_helper(
        None,
        SGX_KEYSELECT_SEAL,
        // C-style bitflags:
        SGX_KEYPOLICY_MRENCLAVE | SGX_KEYPOLICY_MRSIGNER,
    ))
}

/// Drop the first `prefix_len` elements of `vec`, keeping the rest.
fn drop_prefix<T>(prefix_len: usize, mut vec: Vec<T>) -> Vec<T> {
    vec.rotate_left(prefix_len);
    vec.truncate(vec.len() - prefix_len);
    vec
}
