use core::fmt::Display;
use std::error::Error;
use std::prelude::v1::{Box, String};

use secrecy::{ExposeSecret, Secret};

use crate::ported::crypto::SecretBytes;
use crate::schema::actions::{WalletRequest, WalletResponse};
use crate::schema::msgpack::{FromMessagePack, ToMessagePack};
use crate::schema::sealing::{seal_from_enclave, unseal_to_enclave, SealedMessage};
use crate::schema::types::Bytes;
use crate::wallet_operations::create_wallet::create_wallet;
use crate::wallet_operations::open_wallet::open_wallet;
use crate::wallet_operations::sign_transaction::sign_transaction;

/// Implementation for [`crate::ecalls::wallet_operation::wallet_operation`].
///
/// This processes an exchange of the following:
///
/// Request: [`SealedMessage`] of [`WalletRequest`]
///
/// Response: [`SealedMessage`] of [`WalletResponse`]
///
pub fn wallet_operation_impl(sealed_request_bytes: &[u8]) -> Box<[u8]> {
    match wallet_operation_impl_sealing(sealed_request_bytes) {
        Ok(sealed_response_bytes) => sealed_response_bytes,
        Err(error) => panic!("{}", error), // FIXME: better reporting
    }
}

/// Handle sealing and unsealing the exchange.
fn wallet_operation_impl_sealing(sealed_request_bytes: &[u8]) -> Result<Box<[u8]>, Box<dyn Error>> {
    // Unseal request
    let sealed_request = &SealedMessage::from_msgpack(sealed_request_bytes).map_err(|err| {
        format!(
            "wallet_operation_impl: invalid SealedMessage request: {}",
            err
        )
    })?;
    let request_bytes = &unseal_to_enclave(sealed_request)
        .map_err(|err| format!("wallet_operation_impl: failed to unseal request: {}", err))?;
    let wallet_request = &Secret::new(
        WalletRequest::from_msgpack(request_bytes.expose_secret()).map_err(|err| {
            error_message_with_value("invalid WalletRequest", err, request_bytes.expose_secret())
        })?,
    );

    // Dispatch
    let wallet_response = wallet_operation_impl_dispatch(wallet_request.expose_secret());

    // Seal response
    let response_bytes =
        &SecretBytes::new(wallet_response.to_msgpack().map_err(|err| {
            format!("wallet_operation_impl: failed to msgpack response: {}", err)
        })?);
    let sealed_response = seal_from_enclave(response_bytes, &sealed_request.sender_public_key)
        .map_err(|err| format!("wallet_operation_impl: failed to seal response: {}", err))?;
    let sealed_response_bytes = sealed_response.to_msgpack().map_err(|err| {
        format!(
            "wallet_operation_impl: failed to msgpack sealed response: {}",
            err
        )
    })?;
    Ok(sealed_response_bytes)
}

/// Handle dispatching the exchange.
fn wallet_operation_impl_dispatch(wallet_request: &WalletRequest) -> WalletResponse {
    if cfg!(feature = "verbose-debug-logging") {
        println!(
            "DEBUG: wallet_operation_impl_dispatch: dispatching wallet_request = \n{:#?}",
            wallet_request
        );
    }
    match wallet_request {
        WalletRequest::CreateWallet(request) => create_wallet(request).into(),
        WalletRequest::OpenWallet(request) => open_wallet(request).into(),
        WalletRequest::SignTransaction(request) => sign_transaction(request).into(),
    }
}

/// Error message with a base64 value, to help debug MessagePack representation problems.
fn error_message_with_value<E>(message: &str, err: E, value: &Bytes) -> String
where
    E: Display,
{
    format!(
        "wallet_operation_impl: {} ({}): {}",
        message,
        err,
        base64::encode(value)
    )
}
