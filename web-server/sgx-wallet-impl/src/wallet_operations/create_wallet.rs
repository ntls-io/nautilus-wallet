use std::prelude::v1::ToString;

use crate::schema::actions::{CreateWallet, CreateWalletResult};
use crate::schema::entities::{AlgorandAccount, XrpAccount, WalletDisplay, WalletStorable};
use crate::wallet_operations::store::save_new_wallet;

type Result = CreateWalletResult;

pub fn create_wallet(request: &CreateWallet) -> Result {
    let new_account = AlgorandAccount::generate();
    let new_xrp_account = XrpAccount::generate();
    let storable = WalletStorable {
        wallet_id: new_account.address_base32(),
        owner_name: request.owner_name.clone(),
        auth_pin: request.auth_pin.clone(),
        algorand_account: new_account,
        xrp_account: new_xrp_account,
    };
    match save_new_wallet(&storable) {
        Ok(()) => Result::Created(WalletDisplay::from(storable)),
        Err(err) => Result::Failed(err.to_string()),
    }
}
