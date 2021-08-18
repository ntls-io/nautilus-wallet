use std::prelude::v1::ToString;

use sgx_wallet_impl::schema::actions;
use sgx_wallet_impl::schema::actions::CreateWalletResult;
use sgx_wallet_impl::schema::entities::WalletDisplay;
use sgx_wallet_impl::wallet_operations::create_wallet::create_wallet;

pub fn create_test_wallet() -> WalletDisplay {
    type Result = CreateWalletResult;

    let request = &actions::CreateWallet {
        owner_name: "New Owner".to_string(),
        auth_pin: "123456".to_string(),
    };
    match create_wallet(request) {
        Result::Created(created) => created,
        otherwise => panic!("{:?}", otherwise),
    }
}
