use crate::schema::actions::{CheckLimitResult, SignTransaction, SignTransactionResult, SignTransactionWithOtp};
use crate::wallet_operations::sign_transaction::{sign_transaction, sign_transaction_with_otp};

pub fn new_transaction(transaction: &SignTransaction, transaction_with_otp: &SignTransactionWithOtp) -> SignTransactionResult {
    match transaction.transaction_to_sign.check_limit() {
        CheckLimitResult::OtpNotNeeded => sign_transaction(transaction),
        CheckLimitResult::OtpNeeded => sign_transaction_with_otp(transaction_with_otp),
    }
}