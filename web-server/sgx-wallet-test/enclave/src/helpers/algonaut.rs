use std::prelude::v1::ToString;

use algonaut::core::{MicroAlgos, Round, SuggestedTransactionParams};
use algonaut::crypto::HashDigest;
use algonaut::transaction::account::Account;
use algonaut::transaction::{Pay, Transaction, TxnBuilder};

pub(crate) fn create_test_transaction() -> Transaction {
    let account = Account::generate();

    let params = SuggestedTransactionParams {
        genesis_id: "sandnet-v1".to_string(),
        genesis_hash: HashDigest(Default::default()),
        consensus_version: "https://github.com/algorandfoundation/specs/tree/65b4ab3266c52c56a0fa7d591754887d68faad0a".to_string(),
        fee: MicroAlgos(0),
        min_fee: MicroAlgos(1000),
        first_valid: Round(1000),
        last_valid: Round(2000),
    };
    TxnBuilder::with(
        params,
        Pay::new(
            account.address(),
            "4MYUHDWHWXAKA5KA7U5PEN646VYUANBFXVJNONBK3TIMHEMWMD4UBOJBI4"
                .parse()
                .unwrap(),
            MicroAlgos(123_456),
        )
        .build(),
    )
    .build()
}
