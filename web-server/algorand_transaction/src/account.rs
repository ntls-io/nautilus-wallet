use rand::{Rng, CryptoRng};
use crate::error::TransactionError;
use crate::transaction::{SignedTransaction, Transaction, TransactionSignature};
use algorand_core::{Address, Signature};
use ring::signature::Ed25519KeyPair as KeyPairType;
use ring::signature::KeyPair;

pub struct Account {
    seed: [u8; 32],
    address: Address,
    key_pair: KeyPairType,
}

impl Account {
    pub fn generate<T: Rng + CryptoRng>(rng: &mut T) ->  Account{
        let seed: [u8; 32] = rng.gen();
        Self::from_seed(seed)
    }

    /// Create account from 32 byte seed
    pub fn from_seed(seed: [u8; 32]) -> Account {
        let key_pair = KeyPairType::from_seed_unchecked(&seed).unwrap();
        let mut pk = [0; 32];
        pk.copy_from_slice(key_pair.public_key().as_ref());
        let address = Address::new(pk);
        Account {
            seed,
            address,
            key_pair,
        }
    }

    fn generate_sig(&self, bytes: &[u8]) -> Signature {
        let signature = self.key_pair.sign(&bytes);
        // ring returns a signature with padding at the end to make it 105 bytes, only 64 bytes are actually used
        let mut stripped_signature = [0; 64];
        stripped_signature.copy_from_slice(&signature.as_ref()[..64]);
        Signature(stripped_signature)
    }

    fn generate_transaction_sig(
        &self,
        transaction: &Transaction,
    ) -> Result<Signature, TransactionError> {
        Ok(self.generate_sig(&transaction.bytes_to_sign()?))
    }

    /// Sign transaction and generate a single signature SignedTransaction
    pub fn sign_transaction(
        &self,
        transaction: &Transaction,
    ) -> Result<SignedTransaction, TransactionError> {
        Ok(SignedTransaction {
            transaction: transaction.clone(),
            transaction_id: transaction.id()?,
            sig: TransactionSignature::Single(self.generate_transaction_sig(&transaction)?),
        })
    }
}
