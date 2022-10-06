//! Structures representing various entities.

use std::borrow::Borrow;
use std::prelude::v1::{String, ToOwned, ToString};

use algonaut::transaction::account::Account as AlgonautAccount;
use ripple_keypairs::{Entropy, EntropyArray, PrivateKey, PublicKey, Seed};
use serde::{Deserialize, Serialize};
use zeroize::{Zeroize, ZeroizeOnDrop};

use crate::schema::actions::OnfidoCheckResult;
use crate::schema::types::{
    AlgorandAccountSeedBytes,
    AlgorandAddressBase32,
    AlgorandAddressBytes,
    WalletAuthMap,
    WalletId,
    WalletPin,
    XrplAddressBase58,
    XrplKeyType,
    XrplPublicKeyHex,
};

/// A Nautilus wallet's basic displayable details.
///
/// This is what gets sent to clients.
#[derive(Clone, Eq, PartialEq, Debug)] // core
#[derive(Deserialize, Serialize)] // serde
pub struct WalletDisplay {
    pub wallet_id: WalletId,
    pub owner_name: String,
    pub phone_number: Option<String>,

    // TODO(Pi): Decouple for multiple accounts per wallet.
    pub algorand_address_base32: AlgorandAddressBase32,

    pub xrpl_account: XrplAccountDisplay,
}

impl From<WalletStorable> for WalletDisplay {
    fn from(storable: WalletStorable) -> Self {
        Self {
            wallet_id: storable.wallet_id.clone(),
            owner_name: storable.owner_name.clone(),
            phone_number: storable.phone_number.clone(),

            algorand_address_base32: storable.algorand_account.address_base32(),
            xrpl_account: storable.xrpl_account.clone().into(),
        }
    }
}

/// A secret value such as a response to a security challenge
#[derive(Clone, Debug, Eq, PartialEq)] // core
#[derive(Deserialize, Serialize)] // serde
#[derive(Zeroize, ZeroizeOnDrop)] // zeroize
pub struct WalletSecret(String);

impl WalletSecret {
    pub fn new(secret: &str) -> Self {
        Self(String::from(secret))
    }
    pub fn as_bytes(&self) -> &[u8] {
        let WalletSecret(secret) = self;
        secret.as_bytes()
    }
}

/*
 *  Implement ['From<T>'] whenever ['T'] is ['Borrow<str>']
 */
impl<T: Borrow<str>> From<T> for WalletSecret {
    fn from(secret: T) -> Self {
        WalletSecret::new(secret.borrow())
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

    #[zeroize(skip)]
    pub auth_map: WalletAuthMap,

    pub owner_name: String,
    pub phone_number: Option<String>,

    pub algorand_account: AlgorandAccount,
    pub xrpl_account: XrplAccount,

    #[zeroize(skip)]
    pub onfido_check_result: Option<OnfidoCheckResult>,
}

// Algorand entities:

/// An Algorand account.
#[derive(Clone, Eq, PartialEq, Debug)] // core
#[derive(Deserialize, Serialize)] // serde
#[derive(Zeroize, ZeroizeOnDrop)] // zeroize
pub struct AlgorandAccount {
    pub seed_bytes: AlgorandAccountSeedBytes,
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

// XRPL entities:

/// An XRPL account's displayable details.
#[derive(Clone, Eq, PartialEq, Debug)] // core
#[derive(Deserialize, Serialize)] // serde
pub struct XrplAccountDisplay {
    pub key_type: XrplKeyType,
    pub public_key_hex: XrplPublicKeyHex,
    pub address_base58: XrplAddressBase58,
}

impl From<XrplAccount> for XrplAccountDisplay {
    fn from(xrpl_account: XrplAccount) -> Self {
        Self {
            key_type: xrpl_account.key_type,
            public_key_hex: xrpl_account.to_public_key_hex(),
            address_base58: xrpl_account.to_address_base58(),
        }
    }
}

/// An XRPL account.
#[derive(Clone, Eq, PartialEq, Debug)] // core
#[derive(Deserialize, Serialize)] // serde
#[derive(Zeroize, ZeroizeOnDrop)] // zeroize
pub struct XrplAccount {
    #[zeroize(skip)]
    pub key_type: XrplKeyType,

    pub seed_bytes: EntropyArray,
}

impl From<Seed> for XrplAccount {
    fn from(seed: Seed) -> Self {
        let key_type = seed.as_kind().into();
        let seed_bytes = seed.as_entropy().to_owned();
        Self::new(key_type, seed_bytes)
    }
}

impl From<XrplAccount> for Seed {
    fn from(xrpl_account: XrplAccount) -> Self {
        let entropy = Entropy::Array(xrpl_account.seed_bytes);
        let kind = xrpl_account.key_type.into();
        Seed::new(entropy, kind)
    }
}

impl XrplAccount {
    pub(crate) fn new(key_type: XrplKeyType, seed_bytes: EntropyArray) -> Self {
        Self {
            key_type,
            seed_bytes,
        }
    }

    /// Generate a new keypair of the given type.
    pub(crate) fn generate_default() -> Self {
        Self::generate(XrplKeyType::default())
    }

    /// Generate a new keypair of the given type.
    pub(crate) fn generate(key_type: XrplKeyType) -> Self {
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

    pub fn to_address_base58(&self) -> XrplAddressBase58 {
        self.to_public_key().derive_address()
    }

    // TODO: Support X-Address format? Docs: <https://xrpaddress.info/>

    pub fn to_public_key_hex(&self) -> XrplPublicKeyHex {
        self.to_public_key().to_string()
    }
}
