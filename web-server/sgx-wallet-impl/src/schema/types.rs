//! Supporting data types.

use std::boxed::Box;
use std::prelude::v1::String;

use ripple_keypairs::{Algorithm, EntropyArray};
use secrecy::zeroize::Zeroize;
use serde::{Deserialize, Serialize};

use crate::schema::macros::derive_schema_traits;

pub type Bytes = Box<[u8]>;

/// Nautilus Wallet ID.
pub type WalletId = String;

/// A wallet owner's authenticating PIN.
pub type WalletPin = String;

/// Algorand account seed, as bytes.
pub type AlgorandAccountSeedBytes = [u8; 32];

/// Algorand account address, as bytes.
pub type AlgorandAddressBytes = [u8; 32];

/// Algorand account address, as base32 with checksum.
pub type AlgorandAddressBase32 = String;

derive_schema_traits!(
    /// XRP key type (signing algorithm).
    ///
    /// Docs: <https://xrpl.org/cryptographic-keys.html#signing-algorithms>
    #[derive(Copy)]
    #[serde(rename_all = "lowercase")]
    pub enum XrpKeyType {
        Secp256k1,
        Ed25519,
    }
);

/// Default to `secp256k1`, like the XRP Ledger.
impl Default for XrpKeyType {
    fn default() -> Self {
        Self::Secp256k1
    }
}

// Convert between our representation and ripple-keypairs.

/// Convert from `&Algorithm`, as used by ripple-keypairs.
impl From<&Algorithm> for XrpKeyType {
    fn from(algorithm: &Algorithm) -> Self {
        match algorithm {
            Algorithm::Secp256k1 => Self::Secp256k1,
            Algorithm::Ed25519 => Self::Ed25519,
        }
    }
}

/// Convert to `&'static Algorithm`, as expected by ripple-keypairs.
impl From<XrpKeyType> for &'static Algorithm {
    fn from(key_type: XrpKeyType) -> Self {
        match key_type {
            XrpKeyType::Secp256k1 => &Algorithm::Secp256k1,
            XrpKeyType::Ed25519 => &Algorithm::Ed25519,
        }
    }
}

/// XRP account seed, as bytes.
pub type XrpAccountSeedBytes = EntropyArray;

/// XRP account address, as base58 with checksum ("Base58Check").
///
/// Docs: <https://xrpl.org/base58-encodings.html>
pub type XrpAddressBase58 = String;

/// XRP public key, as a hexadecimal string. Used to prepare unsigned transactions.
///
/// Docs: <https://xrpl.org/cryptographic-keys.html#public-key>
pub type XrpPublicKeyHex = String;
