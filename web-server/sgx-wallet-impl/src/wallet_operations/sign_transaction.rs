use std::prelude::v1::ToString;

use crate::schema::actions::{SignTransaction, SignTransactionResult};
use crate::schema::entities::AlgorandTransactionSigned;
use crate::wallet_operations::errors;
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

    // Safety: `split_at` panics if len < mid.
    if request.algorand_transaction_bytes.len() < 2 {
        return Result::Failed(errors::message_with_base64(
            "sign_transaction",
            "transaction too short",
            format!("len = {}", request.algorand_transaction_bytes.len()),
            "unsigned transaction msgpack",
            &request.algorand_transaction_bytes,
        ));
    }

    // Check and strip the "TX" prefix tag
    let transaction_bytes_without_prefix = match request.algorand_transaction_bytes.split_at(2) {
        (b"TX", rest) => rest,
        (unrecognised, _rest) => {
            return Result::Failed(errors::message_with_base64(
                "sign_transaction",
                "transaction prefix tag not recognised",
                format!("expected TX, got {:?}", unrecognised),
                "unsigned transaction msgpack",
                &request.algorand_transaction_bytes,
            ))
        }
    };

    let transaction_to_sign =
        &match algorand_network_compatible::from_msgpack(transaction_bytes_without_prefix) {
            Ok(ok) => ok,
            Err(err) => {
                return Result::Failed(errors::message_with_base64(
                    "sign_transaction",
                    "failed to unpack received transaction-to-be-signed",
                    err,
                    "unsigned transaction msgpack",
                    &request.algorand_transaction_bytes,
                ))
            }
        };

    let signing_account = &stored.algorand_account.as_algonaut_account();

    let signed_transaction = &match signing_account.sign_transaction(transaction_to_sign) {
        Ok(ok) => ok,
        Err(err) => {
            return Result::Failed(errors::message_with_debug_value(
                "sign_transaction",
                "algonaut error while signing transaction",
                err,
                "unsigned transaction",
                transaction_to_sign,
            ))
        }
    };

    // Note: Intentionally serialize with algonaut's `to_msg_pack` helper, not ours.
    let signed_transaction_bytes = match algorand_network_compatible::to_msgpack(signed_transaction)
    {
        Ok(ok) => ok,
        Err(err) => {
            return Result::Failed(errors::message_with_debug_value(
                "sign_transaction",
                "failed to pack signed ",
                err,
                "signed transaction msgpack",
                signed_transaction,
            ))
        }
    };

    Result::Signed(AlgorandTransactionSigned {
        signed_transaction_bytes,
    })
}

/// Algorand network-compatible MessagePack serialization and deserialization.
///
/// This is important to get right: variations will lead to data that's not valid for Algorand.
pub mod algorand_network_compatible {
    use std::prelude::v1::{Box, Vec};

    use algonaut::core::ToMsgPack;
    use serde::Deserialize;

    /// For serialization, we use algonaut's [`ToMsgPack`] trait.
    pub fn to_msgpack(value: &impl ToMsgPack) -> Result<Box<[u8]>, rmp_serde::encode::Error> {
        value.to_msg_pack().map(Vec::into_boxed_slice)
    }

    /// For deserialization, we use `rmp_serde::from_read_ref`, which algonaut currently uses.
    pub fn from_msgpack<'de, D, R>(bytes: &'de R) -> Result<D, rmp_serde::decode::Error>
    where
        D: Deserialize<'de>,
        R: AsRef<[u8]> + ?Sized,
    {
        rmp_serde::from_read_ref(bytes)
    }
}
