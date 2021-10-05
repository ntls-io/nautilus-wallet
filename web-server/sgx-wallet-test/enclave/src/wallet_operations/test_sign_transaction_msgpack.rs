use std::prelude::v1::{String, Vec};

use algonaut::core::{Address, MicroAlgos, Round};
use algonaut::crypto::HashDigest;
use algonaut::transaction::transaction::Payment;
use algonaut::transaction::{Transaction, TransactionType};
use proptest::{prop_assume, proptest};
use sgx_wallet_impl::wallet_operations::sign_transaction_algorand::algorand_network_compatible;

pub(crate) fn prop_transaction_msgpack_roundtrips() {
    proptest!(
    |(
        fee: u64,
        first_valid: u64,
        genesis_hash: [u8; 32],
        last_valid: u64,
        txn_type: ([u8; 32], [u8; 32], u64, Option<[u8; 32]>),
        genesis_id: Option<Vec<u8>>,
        group: Option<[u8; 32]>,
        lease: Option<[u8; 32]>,
        note: Option<Vec<u8>>,
        rekey_to: Option<[u8; 32]>,
    )| {
        let genesis_id: Result<Option<String>, _> = genesis_id.map(String::from_utf8).transpose();
        prop_assume!(genesis_id.is_ok());
        let genesis_id = genesis_id.unwrap();

        let txn_type = TransactionType::Payment(
            Payment {
                sender: Address(txn_type.0),
                receiver: Address(txn_type.1),
                amount: MicroAlgos(txn_type.2),
                close_remainder_to: txn_type.3.map(Address),
            }
        );

        prop_transaction_msgpack_roundtrips_impl(&Transaction {
            fee: MicroAlgos(fee),
            first_valid: Round(first_valid),
            genesis_hash: HashDigest(genesis_hash),
            last_valid: Round(last_valid),
            txn_type,
            genesis_id,
            group: group.map(HashDigest),
            lease: lease.map(HashDigest),
            note,
            rekey_to: rekey_to.map(Address),
        });
    });
}

fn prop_transaction_msgpack_roundtrips_impl(transaction: &Transaction) {
    let bytes = &algorand_network_compatible::to_msgpack(transaction).unwrap();
    let transaction2 = &algorand_network_compatible::from_msgpack(bytes).unwrap();
    assert_eq!(transaction, transaction2);
}
