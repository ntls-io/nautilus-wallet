use std::prelude::v1::*;

use crate::schema::actions::{SignTransaction, SignTransactionResult};
use crate::schema::entities::{
    AlgorandAccount,
    AlgorandTransactionSigned,
    XrpAccount,
    XrpTransactionSigned,
};
use crate::schema::types::Bytes;
use crate::wallet_operations::sign_transaction_algorand::sign_algorand;
use crate::wallet_operations::sign_transaction_xrp::sign_xrp;
use crate::wallet_operations::store::load_wallet;

type Result = SignTransactionResult;

pub fn sign_transaction(request: &SignTransaction) -> SignTransactionResult {
    // Load identified wallet
    let result = match load_wallet(&request.wallet_id) {
        Ok(ok) => ok,
        Err(err) => return Result::Failed(err.to_string()),
    };
    let stored = match result {
        None => return Result::InvalidAuth,
        Some(some) => some,
    };

    // Verify request's authenticating PIN
    if request.auth_pin != stored.auth_pin {
        return Result::InvalidAuth;
    }

    // Authenticated! Proceed to sign the transaction.

    // TODO(Pi): Dispatch this better
    match (
        &request.algorand_transaction_bytes,
        &request.xrp_transaction_bytes,
    ) {
        (Some(algorand_transaction_bytes), None) => {
            sign_algorand_wrapper(&stored.algorand_account, algorand_transaction_bytes)
        }
        (None, Some(xrp_transaction_bytes)) => {
            sign_xrp_wrapper(&stored.xrp_account, xrp_transaction_bytes)
        }
        (Some(_), Some(_)) => Result::Failed(ERROR_BOTH.to_string()),
        (None, None) => Result::Failed(ERROR_NEITHER.to_string()),
    }
}

const ERROR_BOTH: &str =
    "sign_transaction: cannot specify both algorand_transaction_bytes and xrp_transaction_bytes";

const ERROR_NEITHER: &str =
    "sign_transaction: must specify one of algorand_transaction_bytes or xrp_transaction_bytes";

fn sign_algorand_wrapper(
    signing_account: &AlgorandAccount,
    transaction_bytes: &Bytes,
) -> SignTransactionResult {
    match sign_algorand(signing_account, transaction_bytes) {
        Ok(signed_transaction_bytes) => Result::Signed(AlgorandTransactionSigned {
            signed_transaction_bytes,
        }),
        Err(message) => Result::Failed(message),
    }
}

fn sign_xrp_wrapper(
    signing_account: &XrpAccount,
    transaction_bytes: &Bytes,
) -> SignTransactionResult {
    let signature_bytes = sign_xrp(signing_account, transaction_bytes);
    Result::SignedXrp(XrpTransactionSigned {
        signed_transaction_bytes: transaction_bytes.to_owned(),
        signature_bytes,
    })
}
