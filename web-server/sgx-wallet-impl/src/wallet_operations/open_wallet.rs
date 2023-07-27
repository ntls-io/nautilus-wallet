use alloc::string::ToString;

use crate::schema::actions::{OpenWallet, OpenWalletResult};
use crate::schema::entities::WalletDisplay;
use crate::wallet_operations::store::{mutate_wallet, unlock_wallet, UnlockWalletError};

pub fn open_wallet(request: &OpenWallet) -> OpenWalletResult {
    match unlock_wallet(&request.wallet_id, &request.auth_pin) {
        Ok(_) => {
            return match mutate_wallet(&request.wallet_id, |mut stored| {
                stored.account_attempts = 0;
                stored
            }) {
                Ok(Some(stored)) => OpenWalletResult::Opened(WalletDisplay::from(stored)),
                Ok(None) => OpenWalletResult::Failed("Not found".to_string()),
                Err(err) => OpenWalletResult::Failed(err.to_string()),
            }
        }
        Err(err) => match err {
            UnlockWalletError::InvalidAuthPin => {
                match mutate_wallet(&request.wallet_id, |mut stored| {
                    stored.account_attempts = stored.account_attempts + 1;
                    stored
                }) {
                    _ => {}
                }
                return err.into();
            }
            _ => return err.into(),
        },
    };
}
