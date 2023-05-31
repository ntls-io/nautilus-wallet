use crate::schema::actions::{OpenWallet, OpenWalletResult};
use crate::schema::entities::WalletDisplay;
use crate::wallet_operations::store::unlock_wallet;

pub fn open_wallet(request: &OpenWallet) -> OpenWalletResult {
    let stored = match unlock_wallet(&request.wallet_id, &request.auth_pin) {
        Ok(stored) => stored,
        Err(err) => return err.into(),
    };

    OpenWalletResult::Opened(WalletDisplay::from(stored))
}
