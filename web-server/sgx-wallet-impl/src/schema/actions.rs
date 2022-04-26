//! Core request / response message types.
//!
//! # Related
//!
//! * <https://developer.algorand.org/docs/reference/rest-apis/kmd/>

use std::prelude::v1::String;

use serde::{Deserialize, Serialize};
use zeroize::Zeroize;

use crate::schema::entities::{AlgorandTransactionSigned, WalletDisplay};
use crate::schema::macros::derive_schema_traits;
use crate::schema::types::{Bytes, WalletId, WalletPin};

derive_schema_traits!(
    pub struct CreateWallet {
        pub owner_name: String,
        pub auth_pin: WalletPin,
    }
);

derive_schema_traits!(
    pub enum CreateWalletResult {
        Created(WalletDisplay),
        Failed(String),
    }
);

derive_schema_traits!(
    pub struct OpenWallet {
        pub wallet_id: WalletId,
        pub auth_pin: WalletPin,
    }
);

derive_schema_traits!(
    pub enum OpenWalletResult {
        Opened(WalletDisplay),
        InvalidAuth,
        Failed(String),
    }
);

derive_schema_traits!(
    pub struct SignTransaction {
        pub wallet_id: WalletId,
        pub auth_pin: WalletPin,
        #[serde(with = "serde_bytes")]
        pub algorand_transaction_bytes: Bytes,
    }
);

derive_schema_traits!(
    pub enum SignTransactionResult {
        Signed(AlgorandTransactionSigned),
        InvalidAuth,
        Failed(String),
    }
);

derive_schema_traits!(
    pub struct SignAcceptAssetTransaction {
        // TODO: We probably want to do this without requiring the use of the walletId
        pub wallet_id: WalletId,
        pub algorand_transaction_bytes: Bytes,
        // TODO: Access Control
    }
);

derive_schema_traits!(
    /// Dispatching enum for action requests.
    pub enum WalletRequest {
        CreateWallet(CreateWallet),
        OpenWallet(OpenWallet),
        SignTransaction(SignTransaction),
        SignAcceptAssetTransaction(SignAcceptAssetTransaction),
    }
);

derive_schema_traits!(
    /// Dispatching enum for action results.
    pub enum WalletResponse {
        CreateWallet(CreateWalletResult),
        OpenWallet(OpenWalletResult),
        SignTransaction(SignTransactionResult),
        SignAcceptAssetTransaction(SignTransactionResult),
    }
);

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
