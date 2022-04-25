//! Core request / response message types.
//!
//! # Related
//!
//! * <https://developer.algorand.org/docs/reference/rest-apis/kmd/>

use std::prelude::v1::String;

use serde::{Deserialize, Serialize};
use zeroize::{Zeroize, ZeroizeOnDrop};

use crate::schema::entities::WalletDisplay;
use crate::schema::types::{Bytes, WalletId, WalletPin};

#[derive(Clone, Eq, PartialEq, Debug)] // core
#[derive(Deserialize, Serialize)] // serde
#[derive(Zeroize, ZeroizeOnDrop)] // zeroize
pub struct CreateWallet {
    pub owner_name: String,
    pub auth_pin: WalletPin,
}

#[derive(Clone, Eq, PartialEq, Debug)] // core
#[derive(Deserialize, Serialize)] // serde
pub enum CreateWalletResult {
    Created(WalletDisplay),
    Failed(String),
}

#[derive(Clone, Eq, PartialEq, Debug)] // core
#[derive(Deserialize, Serialize)] // serde
#[derive(Zeroize, ZeroizeOnDrop)] // zeroize
pub struct OpenWallet {
    pub wallet_id: WalletId,
    pub auth_pin: WalletPin,
}

#[derive(Clone, Eq, PartialEq, Debug)] // core
#[derive(Deserialize, Serialize)] // serde
pub enum OpenWalletResult {
    Opened(WalletDisplay),
    InvalidAuth,
    Failed(String),
}

#[derive(Clone, Eq, PartialEq, Debug)] // core
#[derive(Deserialize, Serialize)] // serde
#[derive(Zeroize, ZeroizeOnDrop)] // zeroize
pub struct SignTransaction {
    pub wallet_id: WalletId,
    pub auth_pin: WalletPin,

    #[zeroize(skip)]
    pub transaction_to_sign: TransactionToSign,
}

/// For [`SignTransaction`]: A choice of type of transaction to sign.
#[derive(Clone, Eq, PartialEq, Debug)] // core
#[derive(Deserialize, Serialize)] // serde
pub enum TransactionToSign {
    /// An unsigned Algorand transaction.
    AlgorandTransaction {
        #[serde(with = "serde_bytes")]
        transaction_bytes: Bytes,
    },

    /// An unsigned XRPL transaction.
    XrplTransaction {
        #[serde(with = "serde_bytes")]
        transaction_bytes: Bytes,
    },
}

#[derive(Clone, Eq, PartialEq, Debug)] // core
#[derive(Deserialize, Serialize)] // serde
pub enum SignTransactionResult {
    Signed(TransactionSigned),
    InvalidAuth,
    Failed(String),
}

impl SignTransactionResult {
    /// Unwrap [`Self::Signed`] or panic.
    pub fn unwrap_signed(self) -> TransactionSigned {
        match self {
            SignTransactionResult::Signed(signed) => signed,
            otherwise => panic!(
                "called `SignTransactionResult::unwrap_signed` on: {:?}",
                otherwise
            ),
        }
    }
}

/// For [`SignTransactionResult`]: The possible types of signed transactions.
#[derive(Clone, Eq, PartialEq, Debug)] // core
#[derive(Deserialize, Serialize)] // serde
pub enum TransactionSigned {
    /// A signed Algorand transaction.
    AlgorandTransactionSigned {
        #[serde(with = "serde_bytes")]
        signed_transaction_bytes: Bytes,
    },

    /// A signed XRPL transaction.
    XrplTransactionSigned {
        #[serde(with = "serde_bytes")]
        signed_transaction_bytes: Bytes,

        #[serde(with = "serde_bytes")]
        signature_bytes: Bytes,
    },
}

impl TransactionSigned {
    /// Create [`Self::AlgorandTransactionSigned`] from bytes.
    pub fn from_algorand_bytes(signed_transaction_bytes: Bytes) -> Self {
        Self::AlgorandTransactionSigned {
            signed_transaction_bytes,
        }
    }

    /// Unwrap [`Self::AlgorandTransactionSigned`] or panic.
    pub fn unwrap_algorand_bytes(self) -> Bytes {
        match self {
            TransactionSigned::AlgorandTransactionSigned {
                signed_transaction_bytes,
            } => signed_transaction_bytes,
            otherwise => panic!(
                "called `TransactionSigned::unwrap_algorand_bytes` on: {:?}",
                otherwise
            ),
        }
    }
}

/// Dispatching enum for action requests.
#[derive(Clone, Eq, PartialEq, Debug)] // core
#[derive(Deserialize, Serialize)] // serde
#[derive(Zeroize, ZeroizeOnDrop)] // zeroize
pub enum WalletRequest {
    CreateWallet(CreateWallet),
    OpenWallet(OpenWallet),
    SignTransaction(SignTransaction),
}

/// Dispatching enum for action results.
#[derive(Clone, Eq, PartialEq, Debug)] // core
#[derive(Deserialize, Serialize)] // serde
pub enum WalletResponse {
    CreateWallet(CreateWalletResult),
    OpenWallet(OpenWalletResult),
    SignTransaction(SignTransactionResult),
}

// Convenience conversions:

impl From<CreateWalletResult> for WalletResponse {
    fn from(result: CreateWalletResult) -> Self {
        Self::CreateWallet(result)
    }
}

impl From<OpenWalletResult> for WalletResponse {
    fn from(result: OpenWalletResult) -> Self {
        Self::OpenWallet(result)
    }
}

impl From<SignTransactionResult> for WalletResponse {
    fn from(result: SignTransactionResult) -> Self {
        Self::SignTransaction(result)
    }
}
