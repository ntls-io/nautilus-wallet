//! Core request / response message types.
//!
//! # Related
//!
//! * <https://developer.algorand.org/docs/reference/rest-apis/kmd/>

use std::cell::RefCell;
use std::io;
use std::prelude::v1::{String, ToString};

use serde::{Deserialize, Serialize};
use zeroize::{Zeroize, ZeroizeOnDrop};

use crate::crypto::common::PublicKey;
use crate::schema::auth::AuthError;
use crate::schema::entities::{WalletDisplay, XrplAccountDisplay};
use crate::schema::serde_bytes_array;
use crate::schema::types::{Bytes, WalletAuthMap, WalletId, WalletPin};
use crate::wallet_operations::store::{
    GetXrplWalletError,
    SignTransactionRecurringPaymentError,
    UnlockWalletError,
};

#[derive(Clone, Eq, PartialEq, Debug)] // core
#[derive(Deserialize, Serialize)] // serde
#[derive(Zeroize, ZeroizeOnDrop)] // zeroize
pub struct CreateWallet {
    pub owner_name: String,
    pub auth_pin: WalletPin,
    #[zeroize(skip)]
    pub auth_map: WalletAuthMap,
    pub phone_number: Option<String>,
    pub otp_phone_number: Option<String>,
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
    AccountLocked,
    Failed(String),
}

impl From<UnlockWalletError> for OpenWalletResult {
    fn from(err: UnlockWalletError) -> Self {
        use UnlockWalletError::*;
        match err {
            InvalidWalletId => Self::InvalidAuth,
            InvalidAuthPin => Self::InvalidAuth,
            AccountLocked => Self::AccountLocked,
            IoError(err) => Self::Failed(err.to_string()),
        }
    }
}

#[derive(Clone, Eq, PartialEq, Debug)] // core
#[derive(Deserialize, Serialize)] // serde
#[derive(Zeroize, ZeroizeOnDrop)] // zeroize
pub struct GetXrplWallet {
    pub wallet_id: WalletId,
}

#[derive(Clone, Eq, PartialEq, Debug)] // core
#[derive(Deserialize, Serialize)] // serde
pub enum GetXrplWalletResult {
    Opened(XrplAccountDisplay),
    Failed(String),
}

impl From<GetXrplWalletError> for GetXrplWalletResult {
    fn from(err: GetXrplWalletError) -> Self {
        use GetXrplWalletError::*;
        match err {
            InvalidWalletId => Self::Failed("Invalid wallet id".to_string()),
            IoError(err) => Self::Failed(err.to_string()),
        }
    }
}

#[derive(Clone, Eq, PartialEq, Debug)] // core
#[derive(Deserialize, Serialize)] // serde
#[derive(Zeroize, ZeroizeOnDrop)] // zeroize
pub struct StartPinReset {
    pub wallet_id: WalletId,
    /*
     *  The ['RefCell'] below is in adherence to the interior mutability
     *  pattern. This is necessary, since draining a ['WalletAuthMap']
     *  mutates it.
     */
    #[zeroize(skip)]
    pub wallet_auth_map: RefCell<WalletAuthMap>,
    #[serde(with = "serde_bytes_array")]
    pub client_pk: PublicKey,
}

#[derive(Clone, Eq, PartialEq, Debug)] // core
#[derive(Deserialize, Serialize)] // serde
pub enum StartPinResetResult {
    Success,
    InvalidAuth,
    NotFound,
    Failed(String),
}

impl From<AuthError> for StartPinResetResult {
    fn from(error: AuthError) -> Self {
        match error {
            AuthError::InvalidAttempt => Self::InvalidAuth,
            AuthError::InvalidWalletId(_) => Self::InvalidAuth,
            AuthError::Io(err) => Self::Failed(err.to_string()),
        }
    }
}

#[derive(Clone, Eq, PartialEq, Debug)] // core
#[derive(Deserialize, Serialize)] // serde
#[derive(Zeroize, ZeroizeOnDrop)] // zeroize
pub struct PinReset {
    pub wallet_id: WalletId,
    pub new_pin: WalletPin,
    #[zeroize(skip)]
    pub wallet_auth_map: RefCell<WalletAuthMap>,
}

#[derive(Clone, Eq, PartialEq, Debug)] // core
#[derive(Deserialize, Serialize)] // serde
pub enum PinResetResult {
    Reset,
    InvalidAuth,
    NotFound,
    Failed(String),
}

#[derive(Clone, Eq, PartialEq, Debug)] // core
#[derive(Deserialize, Serialize)] // serde
#[derive(Zeroize, ZeroizeOnDrop)] // zeroize
pub struct SignTransactionRecurringPayment {
    pub wallet_id: WalletId,

    #[zeroize(skip)]
    pub transaction_to_sign: TransactionToSign,
}

#[derive(Clone, Eq, PartialEq, Debug)] // core
#[derive(Deserialize, Serialize)] // serde
pub enum SignTransactionRecurringPaymentResult {
    Signed(TransactionSigned),
    Failed(String),
}

impl SignTransactionRecurringPaymentResult {
    /// Unwrap [`Self::Signed`] or panic.
    pub fn unwrap_signed(self) -> TransactionSigned {
        match self {
            SignTransactionRecurringPaymentResult::Signed(signed) => signed,
            otherwise => panic!(
                "called `SignTransactionRecurringPaymentResult::unwrap_signed` on: {:?}",
                otherwise
            ),
        }
    }
}

impl From<SignTransactionRecurringPaymentError> for SignTransactionRecurringPaymentResult {
    fn from(err: SignTransactionRecurringPaymentError) -> Self {
        use SignTransactionRecurringPaymentError::*;
        match err {
            InvalidWalletId => Self::Failed("Invalid wallet id".to_string()),
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

impl From<UnlockWalletError> for SignTransactionResult {
    fn from(err: UnlockWalletError) -> Self {
        use UnlockWalletError::*;
        match err {
            InvalidWalletId => Self::InvalidAuth,
            InvalidAuthPin => Self::InvalidAuth,
            AccountLocked => Self::Failed("Account is locked.".to_string()),
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
            IoError(err) => Self::from(err),
            AccountLocked => Self::Failed("Account is locked.".to_string()),
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
            IoError(err) => Self::from(err),
            AccountLocked => Self::Failed("Account is locked.".to_string()),
        }
    }
}

/// Docs: <https://documentation.onfido.com/v2/#report-object>
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

#[derive(Clone, Eq, PartialEq, Debug)] // core
#[derive(Deserialize, Serialize)] // serde
#[derive(Zeroize, ZeroizeOnDrop)] // zeroize
pub struct UpdateOtpPhoneNumber {
    pub wallet_id: WalletId,
    pub new_phone_number: String,
    pub auth_pin: WalletPin,
}

#[derive(Clone, Eq, PartialEq, Debug)] // core
#[derive(Deserialize, Serialize)] // serde
pub enum UpdateOtpPhoneNumberResult {
    Updated,
    NotFound,
    Failed(String),
}

/// Dispatching enum for action requests.
#[derive(Clone, Eq, PartialEq, Debug)] // core
#[derive(Deserialize, Serialize)] // serde
#[derive(Zeroize, ZeroizeOnDrop)] // zeroize
pub enum WalletRequest {
    CreateWallet(CreateWallet),
    OpenWallet(OpenWallet),
    GetXrplWallet(GetXrplWallet),
    SignTransaction(SignTransaction),
    SignTransactionRecurringPayment(SignTransactionRecurringPayment),

    StartPinReset(StartPinReset),
    PinReset(PinReset),
    UpdateOtpPhoneNumber(UpdateOtpPhoneNumber),

    #[zeroize(skip)]
    SaveOnfidoCheck(SaveOnfidoCheck),

    #[zeroize(skip)]
    LoadOnfidoCheck(LoadOnfidoCheck),
}

/// Dispatching enum for action results.
#[derive(Clone, Eq, PartialEq, Debug)] // core
#[derive(Deserialize, Serialize)] // serde
pub enum WalletResponse {
    CreateWallet(CreateWalletResult),
    OpenWallet(OpenWalletResult),
    GetXrplWallet(GetXrplWalletResult),
    StartPinReset(StartPinResetResult),
    PinReset(PinResetResult),
    SignTransaction(SignTransactionResult),
    SignTransactionRecurringPayment(SignTransactionRecurringPaymentResult),
    SaveOnfidoCheck(SaveOnfidoCheckResult),
    UpdateOtpPhoneNumber(UpdateOtpPhoneNumberResult),
    LoadOnfidoCheck(LoadOnfidoCheckResult),
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

impl From<GetXrplWalletResult> for WalletResponse {
    fn from(result: GetXrplWalletResult) -> Self {
        Self::GetXrplWallet(result)
    }
}

impl From<SignTransactionResult> for WalletResponse {
    fn from(result: SignTransactionResult) -> Self {
        Self::SignTransaction(result)
    }
}

impl From<SignTransactionRecurringPaymentResult> for WalletResponse {
    fn from(result: SignTransactionRecurringPaymentResult) -> Self {
        Self::SignTransactionRecurringPayment(result)
    }
}

impl From<StartPinResetResult> for WalletResponse {
    fn from(result: StartPinResetResult) -> Self {
        Self::StartPinReset(result)
    }
}

impl From<PinResetResult> for WalletResponse {
    fn from(result: PinResetResult) -> Self {
        Self::PinReset(result)
    }
}

impl From<SaveOnfidoCheckResult> for WalletResponse {
    fn from(result: SaveOnfidoCheckResult) -> Self {
        Self::SaveOnfidoCheck(result)
    }
}

impl From<UpdateOtpPhoneNumberResult> for WalletResponse {
    fn from(result: UpdateOtpPhoneNumberResult) -> Self {
        Self::UpdateOtpPhoneNumber(result)
    }
}

impl From<LoadOnfidoCheckResult> for WalletResponse {
    fn from(result: LoadOnfidoCheckResult) -> Self {
        Self::LoadOnfidoCheck(result)
    }
}
