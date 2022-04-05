//! Structures representing various entities.

use std::prelude::v1::{String, ToOwned, ToString};

use algonaut::transaction::account::Account as AlgonautAccount;
use ripple_keypairs::{Entropy, EntropyArray, PrivateKey, PublicKey, Seed};
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
    XrpAddressBase58,
    XrpKeyType,
    XrpPublicKeyHex,
};

derive_schema_traits!(
    /// A Nautilus wallet's basic displayable details.
    ///
    /// This is what gets sent to clients.
    pub struct WalletDisplay {
        pub wallet_id: WalletId,
        pub owner_name: String,

        // TODO(Pi): Decouple for multiple accounts per wallet.
        pub algorand_address_base32: AlgorandAddressBase32,

        pub xrp_account: XrpAccountDisplay,
    }
);

impl From<WalletStorable> for WalletDisplay {
    fn from(storable: WalletStorable) -> Self {
        Self {
            wallet_id: storable.wallet_id.clone(),
            owner_name: storable.owner_name.clone(),
            algorand_address_base32: storable.algorand_account.address_base32(),
            xrp_account: storable.xrp_account.clone().into(),
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

// Algorand entities:

derive_schema_traits!(
    /// An Algorand account.
    pub struct AlgorandAccount {
        pub seed_bytes: AlgorandAccountSeedBytes,
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

derive_schema_traits!(
    /// An unsigned Algorand transaction.
    pub struct AlgorandTransaction {
        #[serde(with = "serde_bytes")]
        pub transaction_bytes: Bytes,
    }
);

derive_schema_traits!(
    /// A signed Algorand transaction.
    pub struct AlgorandTransactionSigned {
        #[serde(with = "serde_bytes")]
        pub signed_transaction_bytes: Bytes,
    }
);

// XRP entities:

derive_schema_traits!(
    /// An XRP account's displayable details.
    pub struct XrpAccountDisplay {
        pub key_type: XrpKeyType,
        pub public_key_hex: XrpPublicKeyHex,
        pub address_base58: XrpAddressBase58,
    }
);

impl From<XrpAccount> for XrpAccountDisplay {
    fn from(xrp_account: XrpAccount) -> Self {
        Self {
            key_type: xrp_account.key_type,
            public_key_hex: xrp_account.to_public_key_hex(),
            address_base58: xrp_account.to_address_base58(),
        }
    }
}

derive_schema_traits!(
    /// An XRP account.
    pub struct XrpAccount {
        pub key_type: XrpKeyType,
        pub seed_bytes: EntropyArray,
    }
);

impl From<Seed> for XrpAccount {
    fn from(seed: Seed) -> Self {
        let key_type = seed.as_kind().into();
        let seed_bytes = seed.as_entropy().to_owned();
        Self::new(key_type, seed_bytes)
    }
}

impl From<XrpAccount> for Seed {
    fn from(xrp_account: XrpAccount) -> Self {
        let entropy = Entropy::Array(xrp_account.seed_bytes);
        let kind = xrp_account.key_type.into();
        Seed::new(entropy, kind)
    }
}

impl XrpAccount {
    pub(crate) fn new(key_type: XrpKeyType, seed_bytes: EntropyArray) -> Self {
        Self {
            key_type,
            seed_bytes,
        }
    }

    /// Generate a new keypair of the given type.
    pub(crate) fn generate_default() -> Self {
        Self::generate(XrpKeyType::default())
    }

    /// Generate a new keypair of the given type.
    pub(crate) fn generate(key_type: XrpKeyType) -> Self {
        Seed::new(Entropy::Random, key_type.into()).into()
    }

    pub(crate) fn to_seed(&self) -> Seed {
        self.clone().into()
    }

    pub(crate) fn to_keypair(&self) -> (PrivateKey, PublicKey) {
        // XXX(Pi): Performance: Repeated key derivation?
        self.to_seed()
            .derive_keypair()
            // Safety: This should not fail unless something is seriously wrong: treat as unrecoverable.
            .expect("XrpAccount: derive_keypair failed!")
    }

    pub(crate) fn to_private_key(&self) -> PrivateKey {
        let (private_key, _) = self.to_keypair();
        private_key
    }

    pub(crate) fn to_public_key(&self) -> PublicKey {
        let (_, public_key) = self.to_keypair();
        public_key
    }

    pub fn to_address_base58(&self) -> XrpAddressBase58 {
        self.to_public_key().derive_address()
    }

    // TODO: Support X-Address format? Docs: <https://xrpaddress.info/>

    pub fn to_public_key_hex(&self) -> XrpPublicKeyHex {
        self.to_public_key().to_string()
    }
}

derive_schema_traits!(
    /// A signed XRP transaction.
    pub struct XrpTransactionSigned {
        #[serde(with = "serde_bytes")]
        pub signed_transaction_bytes: Bytes,
        pub signature_bytes: Bytes,
    }
);
