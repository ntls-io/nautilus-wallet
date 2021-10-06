//! Core request / response message types.
//!
//! # Related
//!
//! * <https://developer.algorand.org/docs/reference/rest-apis/kmd/>

use std::prelude::v1::String;

use serde::{Deserialize, Serialize};
use zeroize::Zeroize;

use crate::schema::entities::{AlgorandTransactionSigned, WalletDisplay, XrpTransactionSigned};
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

        // TODO(Pi): Separate these out better.
        // FIXME(Pi): https://github.com/serde-rs/bytes/issues/14
        // #[serde(with = "serde_bytes", skip_serializing_if = "Option::is_none")]
        // pub algorand_transaction_bytes: Option<ByteBuf>,
        #[serde(with = "serde_bytes", skip_serializing_if = "Option::is_none")]
        pub xrp_transaction_bytes: Option<Bytes>,
    }
);

derive_schema_traits!(
    pub enum SignTransactionResult {
        Signed(AlgorandTransactionSigned),
        SignedXrp(XrpTransactionSigned),
        InvalidAuth,
        Failed(String),
    }
);

derive_schema_traits!(
    /// Dispatching enum for action requests.
    pub enum WalletRequest {
        CreateWallet(CreateWallet),
        OpenWallet(OpenWallet),
        SignTransaction(SignTransaction),
    }
);

derive_schema_traits!(
    /// Dispatching enum for action results.
    pub enum WalletResponse {
        CreateWallet(CreateWalletResult),
        OpenWallet(OpenWalletResult),
        SignTransaction(SignTransactionResult),
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
