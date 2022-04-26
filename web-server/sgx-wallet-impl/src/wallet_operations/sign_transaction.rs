//! Implement [`SignTransaction`].

use std::prelude::v1::{String, ToString};

use crate::schema::actions::{
    SignTransaction,
    SignTransactionResult,
    TransactionSigned,
    TransactionToSign,
};
use crate::wallet_operations::sign_transaction_algorand::sign_algorand;
use crate::wallet_operations::store::load_wallet;

pub fn sign_transaction(request: &SignTransaction) -> SignTransactionResult {
    // Load identified wallet
    let result = match load_wallet(&request.wallet_id) {
        Ok(ok) => ok,
        Err(err) => return SignTransactionResult::Failed(err.to_string()),
    };
    let stored = match result {
        None => return SignTransactionResult::InvalidAuth,
        Some(some) => some,
    };

    // Verify request's authenticating PIN
    if request.auth_pin != stored.auth_pin {
        return SignTransactionResult::InvalidAuth;
    }

    // Authenticated! Proceed to sign the transaction.

    let sign_result: Result<TransactionSigned, String> = match &request.transaction_to_sign {
        TransactionToSign::AlgorandTransaction { transaction_bytes } => {
            sign_algorand(&stored.algorand_account, transaction_bytes)
                .map(TransactionSigned::from_algorand_bytes)
        }
    };

    // `Result` → `SignTransactionResult`
    match sign_result {
        Ok(signed) => SignTransactionResult::Signed(signed),
        Err(message) => SignTransactionResult::Failed(message),
    }
}
