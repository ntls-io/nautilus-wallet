//! Structures representing various entities.

use std::prelude::v1::{String, ToString};

use algonaut::transaction::account::Account as AlgonautAccount;
use ripple_keypairs::Seed;
use serde::{Deserialize, Serialize};
use zeroize::{Zeroize, ZeroizeOnDrop};

use crate::schema::types::{
    AlgorandAccountSeedBytes,
    AlgorandAddressBase32,
    AlgorandAddressBytes,
    WalletId,
    WalletPin,
    XrpAccountSeedBytes,
    XrpAddressClassic,
};

/// A Nautilus wallet's basic displayable details.
///
/// This is what gets sent to clients.
#[derive(Clone, Eq, PartialEq, Debug)] // core
#[derive(Deserialize, Serialize)] // serde
pub struct WalletDisplay {
    pub wallet_id: WalletId,
    pub owner_name: String,
    pub algorand_address_base32: AlgorandAddressBase32,
    pub xrp_address_classic: XrpAddressClassic,
}

impl From<WalletStorable> for WalletDisplay {
    fn from(storable: WalletStorable) -> Self {
        Self {
            wallet_id: storable.wallet_id.clone(),
            owner_name: storable.owner_name.clone(),
            algorand_address_base32: storable.algorand_account.address_base32(),
            xrp_address_classic: storable.xrpl_account.address_classic(),
        }
    }
}

/// A Nautilus wallet's full details.
///
/// This is everything that gets persisted in the wallet store.
#[derive(Clone, Eq, PartialEq, Debug)] // core
#[derive(Deserialize, Serialize)] // serde
#[derive(Zeroize, ZeroizeOnDrop)] // zeroize
pub struct WalletStorable {
    pub wallet_id: WalletId,
    pub auth_pin: WalletPin,
    pub owner_name: String,
    pub algorand_account: AlgorandAccount,
    pub xrpl_account: XrplAccount,
}

/// An Algorand account.
#[derive(Clone, Eq, PartialEq, Debug)] // core
#[derive(Deserialize, Serialize)] // serde
#[derive(Zeroize, ZeroizeOnDrop)] // zeroize
pub struct AlgorandAccount {
    pub seed_bytes: AlgorandAccountSeedBytes,
}

/// An XRPL account.
#[derive(Clone, Eq, PartialEq, Debug)] // core
#[derive(Deserialize, Serialize)] // serde
#[derive(Zeroize, ZeroizeOnDrop)] // zeroize
pub struct XrplAccount {
    pub seed_bytes: XrpAccountSeedBytes,
}

impl AlgorandAccount {
    pub(crate) fn generate() -> Self {
        Self {
            // XXX performance: Or just use OsRng directly?
            seed_bytes: AlgonautAccount::generate().seed(),
        }
    }

    // XXX performance: Repeated temporary conversions through AlgonautAccount?
    pub(crate) fn as_algonaut_account(&self) -> AlgonautAccount {
        AlgonautAccount::from_seed(self.seed_bytes)
    }

    pub fn address_bytes(&self) -> AlgorandAddressBytes {
        self.as_algonaut_account().address().0
    }

    pub fn address_base32(&self) -> AlgorandAddressBase32 {
        self.as_algonaut_account().address().to_string()
    }
}

impl From<AlgorandAccount> for AlgonautAccount {
    fn from(account: AlgorandAccount) -> Self {
        account.as_algonaut_account()
    }
}

impl XrplAccount {
    pub(crate) fn generate() -> Self {
        Self {
            seed_bytes: Seed::random(),
        }
    }

    pub fn address_classic(&self) -> XrpAddressClassic {
        let (_, public_key) = self.seed_bytes.derive_keypair().unwrap();
        public_key.derive_address()
    }
}
