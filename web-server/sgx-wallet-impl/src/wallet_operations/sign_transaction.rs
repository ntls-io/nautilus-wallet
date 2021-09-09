use crate::schema::actions::{SignAcceptAssetTransaction, SignTransaction, SignTransactionResult};

type Result = SignTransactionResult;

pub fn sign_accept_asset_transaction(
    request: &SignAcceptAssetTransaction,
) -> SignTransactionResult {
    match sign_impl::sign_accept_asset_transaction(request) {
        Ok(ok) => Result::Signed(ok),
        Err(err) => err,
    }
}

pub fn sign_transaction(request: &SignTransaction) -> SignTransactionResult {
    match sign_impl::sign_transaction(request) {
        Ok(ok) => Result::Signed(ok),
        Err(err) => err,
    }
}

mod sign_impl {
    use std::prelude::v1::{Box, Result, ToString};

    use algonaut::transaction::account::Account;
    use algonaut::transaction::{Transaction, TransactionType};

    use super::algorand_network_compatible;
    use crate::schema::actions::{
        SignAcceptAssetTransaction,
        SignTransaction,
        SignTransactionResult,
    };
    use crate::schema::entities::{AlgorandTransactionSigned, WalletStorable};
    use crate::schema::types::WalletId;
    use crate::wallet_operations::errors;
    use crate::wallet_operations::store::load_wallet;

    pub(super) fn sign_accept_asset_transaction(
        request: &SignAcceptAssetTransaction,
    ) -> Result<AlgorandTransactionSigned, SignTransactionResult> {
        let stored = get_wallet(&request.wallet_id)?;

        // TODO: Authenticated! Proceed to sign the transaction.
        let transaction_to_sign = deserialize_transaction(&request.algorand_transaction_bytes)?;

        // Ensure that we only proceed if the transaction type is correct, and the fee is 0
        if (matches!(
            transaction_to_sign.txn_type,
            TransactionType::AssetAcceptTransaction(..)
        ) && transaction_to_sign.fee.0 == 0)
        {
            let signing_account = &stored.algorand_account.as_algonaut_account();
            let signed_transaction_bytes =
                sign_transaction_struct(signing_account, &transaction_to_sign)?;
            Ok(AlgorandTransactionSigned {
                signed_transaction_bytes,
            })
        } else {
            // TODO: Is InvalidAuth correct here
            Err(SignTransactionResult::InvalidAuth)
        }
    }

    pub(super) fn sign_transaction(
        request: &SignTransaction,
    ) -> Result<AlgorandTransactionSigned, SignTransactionResult> {
        let stored = get_wallet(&request.wallet_id)?;

        // Verify request's authenticating PIN
        if request.auth_pin != stored.auth_pin {
            return Err(SignTransactionResult::InvalidAuth);
        }

        // Authenticated! Proceed to sign the transaction.

        let transaction_to_sign = deserialize_transaction(&request.algorand_transaction_bytes)?;

        let signing_account = &stored.algorand_account.as_algonaut_account();
        let signed_transaction_bytes =
            sign_transaction_struct(signing_account, &transaction_to_sign)?;
        Ok(AlgorandTransactionSigned {
            signed_transaction_bytes,
        })
    }

    /// Loads the wallet corresponding to the provided wallet ID using the wallet store.
    fn get_wallet(wallet_id: &WalletId) -> Result<WalletStorable, SignTransactionResult> {
        let result = match load_wallet(wallet_id) {
            Ok(ok) => ok,
            Err(err) => return Err(SignTransactionResult::Failed(err.to_string())),
        };
        match result {
            None => Err(SignTransactionResult::InvalidAuth),
            Some(some) => Ok(some),
        }
    }

    fn deserialize_transaction(
        algorand_transaction_bytes: &Box<[u8]>,
    ) -> Result<Transaction, SignTransactionResult> {
        // Safety: `split_at` panics if len < mid.
        if algorand_transaction_bytes.len() < 2 {
            return Err(SignTransactionResult::Failed(errors::message_with_base64(
                "sign_transaction",
                "transaction too short",
                format!("len = {}", algorand_transaction_bytes.len()),
                "unsigned transaction msgpack",
                &algorand_transaction_bytes,
            )));
        }

        // Check and strip the "TX" prefix tag
        let transaction_bytes_without_prefix = match algorand_transaction_bytes.split_at(2) {
            (b"TX", rest) => rest,
            (unrecognised, _rest) => {
                return Err(SignTransactionResult::Failed(errors::message_with_base64(
                    "sign_transaction",
                    "transaction prefix tag not recognised",
                    format!("expected TX, got {:?}", unrecognised),
                    "unsigned transaction msgpack",
                    &algorand_transaction_bytes,
                )))
            }
        };

        // Note: Intentionally serialize with algonaut's `to_msg_pack` helper, not ours.
        match algorand_network_compatible::from_msgpack(transaction_bytes_without_prefix) {
            Ok(ok) => Ok(ok),
            Err(err) => Err(SignTransactionResult::Failed(errors::message_with_base64(
                "sign_transaction",
                "failed to unpack received transaction-to-be-signed",
                err,
                "unsigned transaction msgpack",
                &algorand_transaction_bytes,
            ))),
        }
    }

    fn sign_transaction_struct(
        signing_account: &Account,
        transaction_to_sign: &Transaction,
    ) -> Result<Box<[u8]>, SignTransactionResult> {
        let signed_transaction = &match signing_account.sign_transaction(transaction_to_sign) {
            Ok(ok) => ok,
            Err(err) => {
                return Err(SignTransactionResult::Failed(
                    errors::message_with_debug_value(
                        "sign_transaction",
                        "algonaut error while signing transaction",
                        err,
                        "unsigned transaction",
                        transaction_to_sign,
                    ),
                ))
            }
        };

        match algorand_network_compatible::to_msgpack(signed_transaction) {
            Ok(ok) => Ok(ok),
            Err(err) => Err(SignTransactionResult::Failed(
                errors::message_with_debug_value(
                    "sign_transaction",
                    "failed to pack signed ",
                    err,
                    "signed transaction msgpack",
                    signed_transaction,
                ),
            )),
        }
    }
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
