use std::io;
use std::prelude::v1::Box;

use sgx_trts::memeq::ConsttimeMemEq;
use thiserror::Error;

use crate::ported::kv_store::fs::{FsStore, SgxFiler};
use crate::ported::kv_store::{Key, KvStore};
use crate::schema::entities::{WalletStorable, XrplAccountDisplay};

type WalletStore = FsStore<SgxFiler, WalletStorable>;

// FIXME: Hardcoded
pub const WALLET_STORE_DIR: &str = "wallet_store";

pub fn wallet_store() -> WalletStore {
    FsStore::new(WALLET_STORE_DIR, SgxFiler)
}

pub fn save_new_wallet(new_wallet: &WalletStorable) -> Result<(), io::Error> {
    let mut store = wallet_store();
    let key = &key_from_id(&new_wallet.wallet_id)?;
    match store.try_insert(key, new_wallet)? {
        None => Ok(()),
        Some(existing) => panic!(
            "save_wallet: key conflict! key = {:?}, existing owner = {:?}, new owner = {:?}",
            key, existing.owner_name, new_wallet.owner_name
        ),
    }
}

/// Return `None` if `wallet_id` not found.
pub fn load_wallet(wallet_id: &str) -> Result<Option<WalletStorable>, io::Error> {
    let store = wallet_store();
    let key = &key_from_id(wallet_id)?;
    store.load(key)
}

pub fn key_from_id(wallet_id: &str) -> Result<Box<Key>, io::Error> {
    // XXX: Assume XRP address, for now.
    let address = ripple_address_codec::decode_account_id(wallet_id).map_err(|err| {
        io::Error::new(
            io::ErrorKind::InvalidInput,
            format!(
                "key_from_id failed for wallet_id = {:?}: {}",
                wallet_id, err
            ),
        )
    })?;
    Ok(address.into())
}

/// Load and authenticate access to a wallet.
pub fn unlock_wallet(wallet_id: &str, auth_pin: &str) -> Result<WalletStorable, UnlockWalletError> {
    let stored: WalletStorable =
        load_wallet(wallet_id)?.ok_or(UnlockWalletError::InvalidWalletId)?;

    match ConsttimeMemEq::consttime_memeq(stored.auth_pin.as_bytes(), auth_pin.as_bytes()) {
        true => Ok(stored),
        false => Err(UnlockWalletError::InvalidAuthPin),
    }
}

pub fn load_xrpl_wallet(wallet_id: &str) -> Result<XrplAccountDisplay, GetXrplWalletError> {
    let stored: WalletStorable =
        load_wallet(wallet_id)?.ok_or(GetXrplWalletError::InvalidWalletId)?;

    let xrpl_account = stored.xrpl_account.clone();
    Ok(XrplAccountDisplay::from(xrpl_account))
}

/// [`unlock_wallet`] failed.
///
/// # Security note
///
/// This representation distinguishes `InvalidWalletId` and `InvalidAuthPin`,
/// but this distinction should be limited to internal interfaces:
/// public interfaces should combine invalid authentication cases to avoid information leakage.
#[derive(Debug, Error)]
pub enum UnlockWalletError {
    #[error("invalid wallet ID provided")]
    InvalidWalletId,

    #[error("invalid authentication PIN provided")]
    InvalidAuthPin,

    #[error("I/O error while opening wallet")]
    IoError(#[from] io::Error),
}

/// [`get_xrpl_wallet`] failed.
#[derive(Debug, Error)]
pub enum GetXrplWalletError {
    #[error("invalid wallet ID provided")]
    InvalidWalletId,

    #[error("I/O error while opening wallet")]
    IoError(#[from] io::Error),
}

pub fn mutate_wallet(
    wallet_id: &str,
    mutate_fn: impl FnOnce(WalletStorable) -> WalletStorable,
) -> Result<Option<WalletStorable>, io::Error> {
    let mut store = wallet_store();
    let key = &key_from_id(wallet_id)?;
    store.mutate(key, mutate_fn)
}
