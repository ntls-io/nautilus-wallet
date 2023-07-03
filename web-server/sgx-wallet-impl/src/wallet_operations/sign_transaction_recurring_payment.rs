use std::prelude::v1::String;

use crate::schema::actions::{
    SignTransactionRecurringPayment,
    SignTransactionRecurringPaymentResult,
    TransactionSigned,
    TransactionToSign,
};
use crate::wallet_operations::sign_transaction_xrpl::sign_xrpl;
use crate::wallet_operations::store::load_full_xrpl_wallet;

pub fn sign_transaction_recurring_payment(
    request: &SignTransactionRecurringPayment,
) -> SignTransactionRecurringPaymentResult {
    let xrpl_wallet = match load_full_xrpl_wallet(&request.wallet_id) {
        Ok(xrpl_wallet) => xrpl_wallet,
        Err(err) => return err.into(),
    };

    let sign_result: Result<TransactionSigned, String> = match &request.transaction_to_sign {
        TransactionToSign::XrplTransaction { transaction_bytes } => {
            let signature_bytes = sign_xrpl(&xrpl_wallet, transaction_bytes);
            Ok(TransactionSigned::XrplTransactionSigned {
                signed_transaction_bytes: transaction_bytes.clone(),
                signature_bytes,
            })
        }
        _ => Err(String::from("Unsupported transaction type")),
    };

    // `Result` → `SignTransactionRecurringPaymentResult`
    match sign_result {
        Ok(signed) => SignTransactionRecurringPaymentResult::Signed(signed),
        Err(message) => SignTransactionRecurringPaymentResult::Failed(message),
    }
}
