use std::prelude::v1::ToString;

use algonaut::core::ToMsgPack;
use algonaut::transaction::Transaction as AlgonautTransaction;

use crate::schema::actions::{SignTransaction, SignTransactionResult};
use crate::schema::entities::AlgorandTransactionSigned;
use crate::schema::msgpack::FromMessagePack;
use crate::wallet_operations::store::load_wallet;

type Result = SignTransactionResult;

pub fn sign_transaction(request: &SignTransaction) -> SignTransactionResult {
    // Load wallet
    let result = match load_wallet(&request.wallet_id) {
        Ok(ok) => ok,
        Err(err) => return Result::Failed(err.to_string()),
    };
    let stored = match result {
        None => return Result::InvalidAuth,
        Some(some) => some,
    };

    // Authenticate
    if request.auth_pin != stored.auth_pin {
        return Result::InvalidAuth;
    }

    // We need the transaction in struct form, to pass to algonaut's account for signing.
    let algonaut_transaction =
        &match AlgonautTransaction::from_msgpack(&request.algorand_transaction_bytes) {
            Ok(ok) => ok,
            Err(err) => {
                return Result::Failed(format!(
                    "sign_transaction: decoding transaction failed: {}",
                    err
                ))
            }
        };

    // Sign
    let algonaut_account = &stored.algorand_account.as_algonaut_account();
    let signed_transaction = match algonaut_account.sign_transaction(algonaut_transaction) {
        Ok(ok) => ok,
        Err(err) => {
            return Result::Failed(format!(
                "sign_transaction: algonaut failed to sign: {:?}",
                err
            ))
        }
    };
    // Note: Intentionally serialize with algonaut's `to_msg_pack` helper, not ours.
    let signed_transaction_bytes = match signed_transaction.to_msg_pack() {
        Ok(vec) => vec.into_boxed_slice(),
        Err(err) => {
            return Result::Failed(format!(
                "sign_transaction: serializing SignedTransaction failed: {}",
                err
            ))
        }
    };

    Result::Signed(AlgorandTransactionSigned {
        signed_transaction_bytes,
    })
}
