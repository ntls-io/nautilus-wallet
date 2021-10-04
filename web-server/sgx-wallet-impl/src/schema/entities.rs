//! Structures representing various entities.

use std::prelude::v1::{String, ToString};

use algonaut::transaction::account::Account as AlgonautAccount;
use ripple_keypairs::Seed;
use secrecy::zeroize::Zeroize;
use serde::{Deserialize, Serialize};

use crate::schema::macros::derive_schema_traits;
use crate::schema::types::{
    AlgorandAccountSeedBytes,
    AlgorandAddressBase32,
    AlgorandAddressBytes,
    Bytes,
    WalletId,
    WalletPin,
    XrpAccountSeedBytes,
    XrpAddressClassic,
};

derive_schema_traits!(
    /// A Nautilus wallet's basic displayable details.
    ///
    /// This is what gets sent to clients.
    pub struct WalletDisplay {
        pub wallet_id: WalletId,
        pub owner_name: String,
        pub algorand_address_base32: AlgorandAddressBase32,
        pub xrp_address_classic: XrpAddressClassic,
    }
);

impl From<WalletStorable> for WalletDisplay {
    fn from(storable: WalletStorable) -> Self {
        Self {
            wallet_id: storable.wallet_id.clone(),
            owner_name: storable.owner_name.clone(),
            algorand_address_base32: storable.algorand_account.address_base32(),
            xrp_address_classic: storable.xrp_account.address_classic(),
        }
    }
}

derive_schema_traits!(
    /// A Nautilus wallet's full details.
    ///
    /// This is everything that gets persisted in the wallet store.
    pub struct WalletStorable {
        pub wallet_id: WalletId,
        pub auth_pin: WalletPin,
        pub owner_name: String,
        pub algorand_account: AlgorandAccount,
        pub xrp_account: XrpAccount,
    }
);

derive_schema_traits!(
    /// An Algorand account.
    pub struct AlgorandAccount {
        pub seed_bytes: AlgorandAccountSeedBytes,
    }
);

derive_schema_traits!(
    /// An XRP account.
    pub struct XrpAccount {
        pub seed_bytes: XrpAccountSeedBytes,
    }
);

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

impl XrpAccount {
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

derive_schema_traits!(
    /// An unsigned Algorand transaction.
    pub struct AlgorandTransaction {
        #[serde(with = "serde_bytes")]
        pub transaction_bytes: Bytes,
    }
);

derive_schema_traits!(
    /// An signed Algorand transaction.
    pub struct AlgorandTransactionSigned {
        #[serde(with = "serde_bytes")]
        pub signed_transaction_bytes: Bytes,
    }
);
