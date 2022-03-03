use std::prelude::v1::ToString;

use algonaut::core::ToMsgPack;
use algonaut::transaction::SignedTransaction as AlgonautSignedTransaction;
use sgx_wallet_impl::schema::actions;
use sgx_wallet_impl::schema::actions::SignTransactionResult;
use sgx_wallet_impl::schema::msgpack::FromMessagePack;
use sgx_wallet_impl::wallet_operations::sign_transaction::sign_transaction;

use crate::helpers::algonaut::create_test_transaction;
use crate::helpers::wallet_store::create_test_wallet;

type Result = SignTransactionResult;

pub(crate) fn sign_transaction_works() {
    let existing = &create_test_wallet();

    let algonaut_transaction = create_test_transaction();
    let algorand_transaction_bytes = algonaut_transaction
        .bytes_to_sign()
        .unwrap()
        .into_boxed_slice();

    let request = &actions::SignTransaction {
        wallet_id: existing.wallet_id.clone(),
        auth_pin: "123456".to_string(),
        algorand_transaction_bytes,
    };
    let signed = &match sign_transaction(request) {
        Result::Signed(signed) => signed,
        otherwise => panic!("{:?}", otherwise),
    };

    let algonaut_signed_transaction =
        AlgonautSignedTransaction::from_msgpack(&signed.signed_transaction_bytes).unwrap();
    assert_eq!(
        algonaut_signed_transaction.transaction,
        algonaut_transaction
    );
}

pub(crate) fn sign_transaction_without_tag() {
    let existing = &create_test_wallet();

    let algonaut_transaction = create_test_transaction();
    let algorand_transaction_bytes = algonaut_transaction
        .to_msg_pack()
        .unwrap()
        .into_boxed_slice();

    let request = &actions::SignTransaction {
        wallet_id: existing.wallet_id.clone(),
        auth_pin: "123456".to_string(),
        algorand_transaction_bytes,
    };
    match sign_transaction(request) {
        Result::Failed(err) => assert!(
            // Only check the start: the transaction body contains randomness.
            err.starts_with(
                "ERROR(sign_transaction): transaction prefix tag not recognised\n\
                ( error = expected TX, got [137, 163] )\n\
                [ unsigned transaction msgpack = "
            ),
            "{}",
            err
        ),
        otherwise => panic!("{:?}", otherwise),
    };
}

pub(crate) fn sign_transaction_empty() {
    let existing = &create_test_wallet();

    let algorand_transaction_bytes = Default::default();

    let request = &actions::SignTransaction {
        wallet_id: existing.wallet_id.clone(),
        auth_pin: "123456".to_string(),
        algorand_transaction_bytes,
    };
    match sign_transaction(request) {
        Result::Failed(err) => {
            assert_eq!(
                err,
                "ERROR(sign_transaction): transaction too short\n\
                ( error = len = 0 )\n\
                [ unsigned transaction msgpack =  ]"
            )
        }
        otherwise => panic!("{:?}", otherwise),
    };
}

pub(crate) fn sign_transaction_malformed_transaction() {
    let existing = &create_test_wallet();

    let malformed = "malformed".as_bytes().into();

    let request = &actions::SignTransaction {
        wallet_id: existing.wallet_id.clone(),
        auth_pin: "123456".to_string(),
        algorand_transaction_bytes: malformed,
    };
    match sign_transaction(request) {
        Result::Failed(err) => {
            assert_eq!(
                err,
                "ERROR(sign_transaction): transaction prefix tag not recognised\n\
                ( error = expected TX, got [109, 97] )\n\
                [ unsigned transaction msgpack = bWFsZm9ybWVk ]"
            )
        }
        otherwise => panic!("{:?}", otherwise),
    };
}
