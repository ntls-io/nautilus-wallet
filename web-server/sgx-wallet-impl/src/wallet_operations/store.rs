use std::io;
use std::prelude::v1::Box;
use std::str::FromStr;

use algonaut::core::Address as AlgonautAddress;

use crate::ported::kv_store::fs::{FsStore, SgxFiler};
use crate::ported::kv_store::{Key, KvStore};
use crate::schema::entities::WalletStorable;

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

pub fn load_wallet(wallet_id: &str) -> Result<Option<WalletStorable>, io::Error> {
    let store = wallet_store();
    let key = &key_from_id(wallet_id)?;
    store.load(key)
}

pub fn key_from_id(wallet_id: &str) -> Result<Box<Key>, io::Error> {
    // XXX: Assume Algorand address, for now.
    let address = AlgonautAddress::from_str(wallet_id).map_err(|err| {
        io::Error::new(
            io::ErrorKind::InvalidInput,
            format!(
                "key_from_id failed for wallet_id = {:?}: {}",
                wallet_id, err
            ),
        )
    })?;
    Ok(address.0.into())
}
