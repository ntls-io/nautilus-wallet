//! Supporting data types.

use std::boxed::Box;
use std::prelude::v1::String;

use ripple_keypairs::Seed;

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

/// XRP account address
pub type XrpAddressClassic = String;

/// Xrp account seed,as bytes
pub type XrpAccountSeedBytes = Seed;
