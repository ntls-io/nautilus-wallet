//! Implement transaction signing for Algorand.

use std::prelude::v1::String;

use crate::schema::entities::AlgorandAccount;
use crate::schema::types::Bytes;
use crate::wallet_operations::errors;

pub(crate) fn sign_algorand(
    signing_account: &AlgorandAccount,
    transaction_bytes: &Bytes,
) -> Result<Bytes, String> {
    // Safety: `split_at` panics if len < mid.
    if transaction_bytes.len() < 2 {
        return Err(errors::message_with_base64(
            "sign_transaction",
            "transaction too short",
            format!("len = {}", transaction_bytes.len()),
            "unsigned transaction msgpack",
            transaction_bytes,
        ));
    }

    // Check and strip the "TX" prefix tag
    let transaction_bytes_without_prefix = match transaction_bytes.split_at(2) {
        (b"TX", rest) => rest,
        (unrecognised, _rest) => {
            return Err(errors::message_with_base64(
                "sign_transaction",
                "transaction prefix tag not recognised",
                format!("expected TX, got {:?}", unrecognised),
                "unsigned transaction msgpack",
                transaction_bytes,
            ))
        }
    };

    let transaction_to_sign =
        &match algorand_network_compatible::from_msgpack(transaction_bytes_without_prefix) {
            Ok(ok) => ok,
            Err(err) => {
                return Err(errors::message_with_base64(
                    "sign_transaction",
                    "failed to unpack received transaction-to-be-signed",
                    err,
                    "unsigned transaction msgpack",
                    transaction_bytes,
                ))
            }
        };

    let signed_transaction = &match signing_account
        .as_algonaut_account()
        .sign_transaction(transaction_to_sign)
    {
        Ok(ok) => ok,
        Err(err) => {
            return Err(errors::message_with_debug_value(
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
            return Err(errors::message_with_debug_value(
                "sign_transaction",
                "failed to pack signed",
                err,
                "signed transaction msgpack",
                signed_transaction,
            ))
        }
    };

    Ok(signed_transaction_bytes)
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
