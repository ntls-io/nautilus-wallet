use crate::schema::actions::{CheckLimitResult, SignTransaction, SignTransactionResult};
use crate::wallet_operations::sign_transaction::{sign_transaction, sign_transaction_with_otp};

pub fn new_transaction(transaction: &SignTransaction) -> SignTransactionResult {
    match transaction.transaction_to_sign.check_limit() {
        CheckLimitResult::OtpNotNeeded => sign_transaction(transaction),
        CheckLimitResult::OtpNeeded => sign_transaction_with_otp(transaction),
    }
}