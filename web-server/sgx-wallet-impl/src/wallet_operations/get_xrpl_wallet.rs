use crate::schema::actions::{GetXrplWallet, GetXrplWalletResult};
use crate::wallet_operations::store::load_xrpl_wallet;

pub fn get_xrpl_wallet(request: &GetXrplWallet) -> GetXrplWalletResult {
    let xrpl_wallet = match load_xrpl_wallet(&request.wallet_id) {
        Ok(xrpl_wallet) => xrpl_wallet,
        Err(err) => return err.into(),
    };

    GetXrplWalletResult::Opened(xrpl_wallet)
}
