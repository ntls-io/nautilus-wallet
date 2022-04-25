//! Core request / response message types.
//!
//! # Related
//!
//! * <https://developer.algorand.org/docs/reference/rest-apis/kmd/>

use std::prelude::v1::String;

use serde::{Deserialize, Serialize};
use zeroize::{Zeroize, ZeroizeOnDrop};

use crate::schema::entities::{AlgorandTransactionSigned, WalletDisplay};
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
    #[serde(with = "serde_bytes")]
    pub algorand_transaction_bytes: Bytes,
}

#[derive(Clone, Eq, PartialEq, Debug)] // core
#[derive(Deserialize, Serialize)] // serde
pub enum SignTransactionResult {
    Signed(AlgorandTransactionSigned),
    InvalidAuth,
    Failed(String),
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
