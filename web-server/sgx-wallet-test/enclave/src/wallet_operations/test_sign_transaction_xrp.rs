use std::prelude::v1::ToString;

use sgx_wallet_impl::schema::actions;
use sgx_wallet_impl::schema::actions::SignTransactionResult;
use sgx_wallet_impl::wallet_operations::sign_transaction::sign_transaction;

use crate::helpers::wallet_store::create_test_wallet;

type Result = SignTransactionResult;

pub(crate) fn sign_transaction_empty() {
    let existing = &create_test_wallet();

    let xrp_transaction_bytes = Default::default();

    let request = &actions::SignTransaction {
        wallet_id: existing.wallet_id.clone(),
        auth_pin: "123456".to_string(),
        /*algorand_transaction_bytes: None,*/
        xrp_transaction_bytes: Some(xrp_transaction_bytes),
    };
    let signature = match sign_transaction(request) {
        Result::SignedXrp(signature) => signature,
        otherwise => panic!("unexpected: {:?}", otherwise),
    };
    let signature_bytes = signature.signature_bytes.as_ref();

    // TODO(Pi): Test more substantially.
    assert_eq!(signature_bytes[0], 0x30); // DER tag for SEQUENCE
}
