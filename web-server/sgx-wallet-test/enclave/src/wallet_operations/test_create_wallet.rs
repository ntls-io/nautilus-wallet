use std::prelude::v1::ToString;

use sgx_wallet_impl::schema::actions;
use sgx_wallet_impl::schema::actions::CreateWalletResult as Result;
use sgx_wallet_impl::schema::entities::XrpAccountDisplay;
use sgx_wallet_impl::wallet_operations::create_wallet::create_wallet;
use sgx_wallet_impl::wallet_operations::store::load_wallet;

pub(crate) fn create_wallet_works() {
    let request = &actions::CreateWallet {
        owner_name: "New Owner".to_string(),
        auth_pin: "123456".to_string(),
    };
    let display = &match create_wallet(request) {
        Result::Created(created) => created,
        Result::Failed(failed) => panic!(failed),
    };

    assert_eq!(display.owner_name, request.owner_name);

    let stored = load_wallet(&display.wallet_id).unwrap().unwrap();
    assert_eq!(display.wallet_id, stored.wallet_id);
    assert_eq!(display.owner_name, stored.owner_name);
    assert_eq!(
        display.algorand_address_base32,
        stored.algorand_account.address_base32()
    );
    assert_eq!(
        display.xrp_account,
        XrpAccountDisplay {
            key_type: stored.xrp_account.key_type,
            public_key_hex: stored.xrp_account.to_public_key_hex(),
            address_base58: stored.xrp_account.to_address_base58()
        }
    );
}
