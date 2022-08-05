//! Implement [`SignTransaction`].

use std::prelude::v1::String;

use crate::schema::actions::{
    SignTransaction,
    SignTransactionResult,
    TransactionSigned,
    TransactionToSign,
};
use crate::wallet_operations::sign_transaction_algorand::sign_algorand;
use crate::wallet_operations::sign_transaction_xrpl::sign_xrpl;
use crate::wallet_operations::store::unlock_wallet;

pub fn sign_transaction(request: &SignTransaction) -> SignTransactionResult {
    let stored = match unlock_wallet(&request.wallet_id, &request.auth_pin) {
        Ok(stored) => stored,
        Err(err) => return err.into(),
    };

    // TODO: Check OTP, if OK, proceed to next action, if failed, user sent another OTP.

    let sign_result: Result<TransactionSigned, String> = match &request.transaction_to_sign {
        TransactionToSign::AlgorandTransaction { transaction_bytes } => {
            sign_algorand(&stored.algorand_account, transaction_bytes)
                .map(TransactionSigned::from_algorand_bytes)
        }

        TransactionToSign::XrplTransaction { transaction_bytes } => {
            let signature_bytes = sign_xrpl(&stored.xrpl_account, transaction_bytes);
            Ok(TransactionSigned::XrplTransactionSigned {
                signed_transaction_bytes: transaction_bytes.clone(),
                signature_bytes,
            })
        }
    };

    // `Result` → `SignTransactionResult`
    match sign_result {
        Ok(signed) => SignTransactionResult::Signed(signed),
        Err(message) => SignTransactionResult::Failed(message),
    }
}
