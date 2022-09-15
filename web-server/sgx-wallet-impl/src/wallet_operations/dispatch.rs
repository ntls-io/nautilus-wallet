use std::error::Error;
use std::prelude::v1::Box;

use secrecy::{ExposeSecret, Secret};

use crate::ported::crypto::SecretBytes;
use crate::schema::actions::{WalletRequest, WalletResponse};
use crate::schema::msgpack::{FromMessagePack, ToMessagePack};
use crate::schema::sealing::{seal_from_enclave, unseal_to_enclave, SealedMessage};
use crate::wallet_operations::create_wallet::create_wallet;
use crate::wallet_operations::errors;
use crate::wallet_operations::load_onfido_check::load_onfido_check;
use crate::wallet_operations::open_wallet::open_wallet;
use crate::wallet_operations::save_onfido_check::save_onfido_check;
use crate::wallet_operations::sign_transaction::sign_transaction;

use super::pin_reset::{start_pin_reset, reset_wallet_pin};

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
        errors::message_with_base64(
            "wallet_operation_impl_sealing",
            "failed to unpack received sealed request",
            err,
            "sealed request msgpack",
            sealed_request_bytes,
        )
    })?;
    let request_bytes = &unseal_to_enclave(sealed_request).map_err(|err| {
        errors::message_with_debug_value(
            "wallet_operation_impl_sealing",
            "failed to unseal request",
            err,
            "sealed request",
            sealed_request,
        )
    })?;
    let wallet_request = &Secret::new(
        WalletRequest::from_msgpack(request_bytes.expose_secret()).map_err(|err| {
            errors::message_with_base64(
                "wallet_operation_impl_sealing",
                "invalid WalletReq",
                err,
                "unsealed WalletRequest msgpack",
                request_bytes.expose_secret(),
            )
        })?,
    );

    // Dispatch
    let wallet_response = wallet_operation_impl_dispatch(wallet_request.expose_secret());

    // Seal response
    let response_bytes = &SecretBytes::new(wallet_response.to_msgpack().map_err(|err| {
        errors::message_with_debug_value(
            "wallet_operation_impl_sealing",
            "failed to msgpack WalletResponse-to-seal",
            err,
            "unsealed WalletResponse",
            wallet_response,
        )
    })?);
    let sealed_response = seal_from_enclave(response_bytes, &sealed_request.sender_public_key)
        .map_err(|err| {
            errors::message_with_base64(
                "wallet_operation_impl_sealing",
                "failed to seal packed WalletResponse",
                err,
                "unsealed WalletResponse msgpack",
                response_bytes.expose_secret(),
            )
        })?;
    let sealed_response_bytes = sealed_response.to_msgpack().map_err(|err| {
        errors::message_with_debug_value(
            "wallet_operation_impl_sealing",
            "failed to msgpack sealed WalletRequest",
            err,
            "sealed response",
            sealed_response,
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
        WalletRequest::StartPinReset(request) => start_pin_reset(request).into(),
        WalletRequest::PinReset(request) => reset_wallet_pin(request).into(),
        WalletRequest::SaveOnfidoCheck(request) => save_onfido_check(request).into(),
        WalletRequest::LoadOnfidoCheck(request) => load_onfido_check(request).into(),
    }
}
