use crate::account::Account;
use crate::error::TransactionError;
use algorand_core::{
    Address, MicroAlgos, MultisigSignature, Round, Signature, SignedLogic, ToMsgPack,
};
use algorand_crypto::HashDigest;
use data_encoding::BASE32_NOPAD;
use serde::{Deserialize, Deserializer, Serialize, Serializer};
use sha2::Digest;

const MIN_TXN_FEE: MicroAlgos = MicroAlgos(1000);

/// Enum containing the types of transactions and their specific fields
#[derive(Debug, Clone, Eq, PartialEq)]
pub enum TransactionType {
    Payment(Payment),
}

/// A transaction that can appear in a block
#[derive(Debug, Clone, Eq, PartialEq)]
pub struct Transaction {
    /// Paid by the sender to the FeeSink to prevent denial-of-service. The minimum fee on Algorand
    /// is currently 1000 microAlgos.
    pub fee: MicroAlgos,

    /// The first round for when the transaction is valid. If the transaction is sent prior to this
    /// round it will be rejected by the network.
    pub first_valid: Round,

    /// The hash of the genesis block of the network for which the transaction is valid. See the
    /// genesis hash for MainNet, TestNet, and BetaNet.
    pub genesis_hash: HashDigest,

    /// The ending round for which the transaction is valid. After this round, the transaction will
    /// be rejected by the network.
    pub last_valid: Round,

    /// The address of the account that pays the fee and amount.
    pub sender: Address,

    /// Specifies the type of transaction. This value is automatically generated using any of the
    /// developer tools.
    pub txn_type: TransactionType,

    /// The human-readable string that identifies the network for the transaction. The genesis ID is
    /// found in the genesis block. See the genesis ID for MainNet, TestNet, and BetaNet.
    pub genesis_id: String,

    /// The group specifies that the transaction is part of a group and, if so, specifies the hash of
    /// the transaction group. Assign a group ID to a transaction through the workflow described in
    /// the Atomic Transfers Guide.
    pub group: Option<HashDigest>,

    /// A lease enforces mutual exclusion of transactions. If this field is nonzero, then once the
    /// transaction is confirmed, it acquires the lease identified by the (Sender, Lease) pair of
    /// the transaction until the LastValid round passes. While this transaction possesses the
    /// lease, no other transaction specifying this lease can be confirmed. A lease is often used
    /// in the context of Algorand Smart Contracts to prevent replay attacks. Read more about
    /// Algorand Smart Contracts and see the Delegate Key Registration TEAL template for an example
    /// implementation of leases. Leases can also be used to safeguard against unintended duplicate
    /// spends. For example, if I send a transaction to the network and later realize my fee was too
    /// low, I could send another transaction with a higher fee, but the same lease value. This would
    /// ensure that only one of those transactions ends up getting confirmed during the validity period.
    pub lease: Option<HashDigest>,

    /// Any data up to 1000 bytes.
    pub note: Option<Vec<u8>>,

    /// Specifies the authorized address. This address will be used to authorize all future transactions.
    /// Learn more about Rekeying accounts.
    pub rekey_to: Option<Address>,
}

impl Transaction {
    /// Creates a new transaction with a fee calculated based on `fee_per_byte`.
    pub fn fee_per_byte(
        mut self,
        fee_per_byte: MicroAlgos,
    ) -> Result<Transaction, TransactionError> {
        self.fee = MIN_TXN_FEE.max(fee_per_byte * self.estimate_size()?);
        Ok(self)
    }

    pub fn bytes_to_sign(&self) -> Result<Vec<u8>, TransactionError> {
        let encoded_tx = self.to_owned().to_msg_pack()?;
        let mut prefix_encoded_tx = b"TX".to_vec();
        prefix_encoded_tx.extend_from_slice(&encoded_tx);
        Ok(prefix_encoded_tx)
    }

    pub fn raw_id(&self) -> Result<HashDigest, TransactionError> {
        let hashed = sha2::Sha512Trunc256::digest(&self.bytes_to_sign()?);
        Ok(HashDigest(hashed.into()))
    }

    pub fn id(&self) -> Result<String, TransactionError> {
        Ok(BASE32_NOPAD.encode(&self.raw_id()?.0))
    }

    pub fn assign_group_id(&mut self, group_id: HashDigest) {
        self.group = Some(group_id)
    }

    // Estimates the size of the encoded transaction, used in calculating the fee
    fn estimate_size(&self) -> Result<u64, TransactionError> {
        let account = Account::generate();
        let signed_transaction = account.sign_transaction(self)?;
        Ok(signed_transaction.to_msg_pack()?.len() as u64)
    }
}
/// Fields for a payment transaction
#[derive(Debug, Clone, Eq, PartialEq)]
pub struct Payment {
    /// The address of the account that receives the amount.
    pub receiver: Address,

    /// The total amount to be sent in microAlgos.
    pub amount: MicroAlgos,

    /// When set, it indicates that the transaction is requesting that the Sender account should
    /// be closed, and all remaining funds, after the fee and amount are paid, be transferred to
    /// this address.
    pub close_remainder_to: Option<Address>,
}

/// Storage state schema. The StateSchema object is only required for the create application call
/// transaction. The StateSchema object must be fully populated for both the GlobalStateSchema and
/// LocalStateSchema objects.
#[derive(Clone, Debug, Eq, PartialEq)]
pub struct StateSchema {
    /// Maximum number of integer values that may be stored in the [global || local] application
    /// key/value store. Immutable.
    pub number_ints: u64,

    /// Maximum number of byte slices values that may be stored in the [global || local] application
    /// key/value store. Immutable.
    pub number_byteslices: u64,
}

/// Wraps a transaction in a signature. The encoding of this struct is suitable to be broadcast
/// on the network
// #[derive(Clone, Debug, Eq, PartialEq, Serialize, Deserialize)]
#[derive(Clone, Debug, Eq, PartialEq)]
pub struct SignedTransaction {
    pub transaction: Transaction,
    pub transaction_id: String,
    pub sig: TransactionSignature,
}

#[derive(Clone, Debug, Eq, PartialEq)]
pub enum TransactionSignature {
    Single(Signature),
    Multi(MultisigSignature),
    Logic(SignedLogic),
}
