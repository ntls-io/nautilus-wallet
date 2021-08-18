use std::prelude::v1::ToString;

use crate::schema::actions::{OpenWallet, OpenWalletResult};
use crate::schema::entities::WalletDisplay;
use crate::wallet_operations::store::load_wallet;

type Result = OpenWalletResult;

pub fn open_wallet(request: &OpenWallet) -> OpenWalletResult {
    let result = match load_wallet(&request.wallet_id) {
        Ok(ok) => ok,
        Err(err) => return Result::Failed(err.to_string()),
    };
    let stored = match result {
        None => return Result::InvalidAuth,
        Some(some) => some,
    };

    if request.auth_pin == stored.auth_pin {
        Result::Opened(WalletDisplay::from(stored))
    } else {
        Result::InvalidAuth
    }
}
