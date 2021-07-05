use algorand_core::Address;
use rand::{Rng, rngs::OsRng};
use ring::signature::Ed25519KeyPair as KeyPairType;
use ring::signature::KeyPair;

pub struct Account {
    seed: [u8; 32],
    address: Address,
    key_pair: KeyPairType,
}

impl Account {
    pub fn generate() ->  Account{
        let seed: [u8; 32] = OsRng.gen();
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
}