use std::prelude::v1::ToString;

use crate::schema::actions::{CreateWallet, CreateWalletResult};
use crate::schema::entities::{AlgorandAccount, WalletDisplay, WalletStorable, XrplAccount};
use crate::wallet_operations::store::save_new_wallet;

type Result = CreateWalletResult;

pub fn create_wallet(request: &CreateWallet) -> Result {
    // TODO(Pi): Pull account / keypair creation into a separate operation.
    //           For now, just generate both Algorand and XRP keypairs.
    let new_algorand_account = AlgorandAccount::generate();
    let new_xrpl_account = XrplAccount::generate_default();

    let storable = WalletStorable {
        wallet_id: new_algorand_account.address_base32(),
        owner_name: request.owner_name.clone(),
        auth_pin: request.auth_pin.clone(),
        algorand_account: new_algorand_account,
        xrpl_account: new_xrpl_account,
    };
    match save_new_wallet(&storable) {
        Ok(()) => Result::Created(WalletDisplay::from(storable)),
        Err(err) => Result::Failed(err.to_string()),
    }
}
