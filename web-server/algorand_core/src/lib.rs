#![no_std]
const HASH_LEN: usize = 32;


/// Public key address
#[derive(Copy, Clone, Eq, PartialEq)]
pub struct Address(pub [u8; HASH_LEN]);

impl Address {
    pub fn new(bytes: [u8; HASH_LEN]) -> Address {
        Address(bytes)
    }
}
