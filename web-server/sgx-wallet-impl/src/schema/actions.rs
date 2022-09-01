//! Core request / response message types.
//!
//! # Related
//!
//! * <https://developer.algorand.org/docs/reference/rest-apis/kmd/>

use std::io;
use std::prelude::v1::{String, ToString};

use serde::{Deserialize, Serialize};
use zeroize::{Zeroize, ZeroizeOnDrop};

use crate::schema::entities::WalletDisplay;
use crate::schema::types::{Bytes, WalletId, WalletPin};
use crate::wallet_operations::store::UnlockWalletError;

#[derive(Clone, Eq, PartialEq, Debug)] // core
#[derive(Deserialize, Serialize)] // serde
#[derive(Zeroize, ZeroizeOnDrop)] // zeroize
pub struct CreateWallet {
    pub owner_name: String,
    pub auth_pin: WalletPin,
    pub phone_number: Option<String>,
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

impl From<UnlockWalletError> for OpenWalletResult {
    fn from(err: UnlockWalletError) -> Self {
        use UnlockWalletError::*;
        match err {
            InvalidWalletId => Self::InvalidAuth,
            InvalidAuthPin => Self::InvalidAuth,
            InvalidOtp => Self::InvalidAuth,
            IoError(err) => Self::Failed(err.to_string()),
        }
    }
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

#[derive(Clone, Eq, PartialEq, Debug)] // core
#[derive(Deserialize, Serialize)] // serde
#[derive(Zeroize, ZeroizeOnDrop)] // zeroize
pub struct SignTransactionWithOtp {
    pub wallet_id: WalletId,
    pub auth_pin: WalletPin,

    #[zeroize(skip)]
    pub transaction_to_sign: TransactionToSign,

    #[zeroize(skip)]
    pub otp: String
}

impl From<UnlockWalletError> for SignTransactionResult {
    fn from(err: UnlockWalletError) -> Self {
        use UnlockWalletError::*;
        match err {
            InvalidWalletId => Self::InvalidAuthPin,
            InvalidAuthPin => Self::InvalidAuthPin,
            InvalidOtp => Self::InvalidAuthOtp,
            IoError(err) => Self::Failed(err.to_string()),
        }
    }
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

pub enum CheckLimitResult {
    OtpNeeded,
    OtpNotNeeded,
}

impl TransactionToSign {
    pub fn check_limit(&self) -> CheckLimitResult {
        match self  {
            // TODO: Parse Transaction and check amount
            TransactionToSign::XrplTransaction {transaction_bytes} => {CheckLimitResult::OtpNeeded},
            // TODO: Add Algorand case
            TransactionToSign::AlgorandTransaction {..} => todo!(),
        }
    }
}

#[derive(Clone, Eq, PartialEq, Debug)] // core
#[derive(Deserialize, Serialize)] // serde
pub enum SignTransactionResult {
    Signed(TransactionSigned),
    InvalidAuthPin,
    InvalidAuthOtp,
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

#[derive(Clone, Eq, PartialEq, Debug)] // core
#[derive(Deserialize, Serialize)] // serde
pub struct SaveOnfidoCheck {
    pub wallet_id: WalletId,
    pub auth_pin: WalletPin,

    pub check: OnfidoCheckResult,
}

#[derive(Clone, Eq, PartialEq, Debug)] // core
#[derive(Deserialize, Serialize)] // serde
pub enum SaveOnfidoCheckResult {
    Saved,
    InvalidAuth,
    Failed(String),
}

impl From<io::Error> for SaveOnfidoCheckResult {
    fn from(err: io::Error) -> Self {
        Self::Failed(err.to_string())
    }
}

impl From<UnlockWalletError> for SaveOnfidoCheckResult {
    fn from(err: UnlockWalletError) -> Self {
        use UnlockWalletError::*;
        match err {
            InvalidWalletId => Self::InvalidAuth,
            InvalidAuthPin => Self::InvalidAuth,
            //FIXME: Do additional error handling to prevent panic.
            InvalidOtp => unreachable!(), // This variant should never happen as otp is not a feature required for KYC.
            IoError(err) => Self::from(err),
        }
    }
}

#[derive(Clone, Eq, PartialEq, Debug)] // core
#[derive(Deserialize, Serialize)] // serde
pub struct LoadOnfidoCheck {
    pub wallet_id: WalletId,
    pub auth_pin: WalletPin,
}

#[derive(Clone, Eq, PartialEq, Debug)] // core
#[derive(Deserialize, Serialize)] // serde
pub struct GenerateOtp {
    pub wallet_id: WalletId,
}

#[derive(Clone, Eq, PartialEq, Debug)] // core
#[derive(Deserialize, Serialize)] // serde
pub enum GenerateOtpResult {
    Generated(String),
    Failed(String),
}

#[derive(Clone, Eq, PartialEq, Debug)] // core
#[derive(Deserialize, Serialize)] // serde
pub enum LoadOnfidoCheckResult {
    Loaded(OnfidoCheckResult),
    NotFound,
    InvalidAuth,
    Failed(String),
}

impl From<io::Error> for LoadOnfidoCheckResult {
    fn from(err: io::Error) -> Self {
        Self::Failed(err.to_string())
    }
}

impl From<UnlockWalletError> for LoadOnfidoCheckResult {
    fn from(err: UnlockWalletError) -> Self {
        use UnlockWalletError::*;
        match err {
            InvalidWalletId => Self::InvalidAuth,
            InvalidAuthPin => Self::InvalidAuth,
            //FIXME: Do additional error handling to prevent panic.
            InvalidOtp => unreachable!(), // This variant should never happen as otp is not a feature required for KYC.
            IoError(err) => Self::from(err),
        }
    }
}

/// Docs: https://documentation.onfido.com/v2/#report-object
#[derive(Clone, Eq, PartialEq, Debug)] // core
#[derive(Deserialize, Serialize)] // serde
pub struct OnfidoCheckResult {
    pub id: String,

    pub href: String,

    /// Docs: <https://documentation.onfido.com/v2/#report-results>
    pub result: String,

    /// Docs: <https://documentation.onfido.com/v2/#sub-results-document-reports>
    pub sub_result: Option<String>,
}

/// Dispatching enum for action requests.
#[derive(Clone, Eq, PartialEq, Debug)] // core
#[derive(Deserialize, Serialize)] // serde
#[derive(Zeroize, ZeroizeOnDrop)] // zeroize
pub enum WalletRequest {
    CreateWallet(CreateWallet),
    OpenWallet(OpenWallet),
    SignTransaction(SignTransaction),
    SignTransactionWithOtp(SignTransactionWithOtp),

    #[zeroize(skip)]
    SaveOnfidoCheck(SaveOnfidoCheck),

    #[zeroize(skip)]
    LoadOnfidoCheck(LoadOnfidoCheck),

    #[zeroize(skip)]
    GenerateOtp(GenerateOtp),
}

/// Dispatching enum for action results.
#[derive(Clone, Eq, PartialEq, Debug)] // core
#[derive(Deserialize, Serialize)] // serde
pub enum WalletResponse {
    CreateWallet(CreateWalletResult),
    OpenWallet(OpenWalletResult),
    SignTransaction(SignTransactionResult),
    SaveOnfidoCheck(SaveOnfidoCheckResult),
    LoadOnfidoCheck(LoadOnfidoCheckResult),
    GenerateOtp(GenerateOtpResult),
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

impl From<SaveOnfidoCheckResult> for WalletResponse {
    fn from(result: SaveOnfidoCheckResult) -> Self {
        Self::SaveOnfidoCheck(result)
    }
}

impl From<LoadOnfidoCheckResult> for WalletResponse {
    fn from(result: LoadOnfidoCheckResult) -> Self {
        Self::LoadOnfidoCheck(result)
    }
}

impl From<GenerateOtpResult> for WalletResponse {
    fn from(result: GenerateOtpResult) -> Self {
        Self::GenerateOtp(result)
    }
}
