use data_encoding::{BASE32_NOPAD, BASE64};
use fmt::Debug;
use std::fmt::{self, Formatter};

use algorand_encoding::{deserialize_bytes32, U8_32Visitor};
use serde::{Deserialize, Deserializer, Serialize, Serializer};

#[derive(Copy, Clone, Eq, PartialEq)]
pub struct Ed25519PublicKey(pub [u8; 32]);

/// A SHA512_256 hash
#[derive(Copy, Clone, Eq, PartialEq)]
pub struct HashDigest(pub [u8; 32]);

impl Serialize for HashDigest {
    fn serialize<S>(&self, serializer: S) -> Result<<S as Serializer>::Ok, <S as Serializer>::Error>
    where
        S: Serializer,
    {
        serializer.serialize_bytes(&self.0[..])
    }
}

impl<'de> Deserialize<'de> for HashDigest {
    fn deserialize<D>(deserializer: D) -> Result<Self, D::Error>
    where
        D: Deserializer<'de>,
    {
        Ok(HashDigest(deserializer.deserialize_bytes(U8_32Visitor)?))
    }
}

pub fn deserialize_hash<'de, D>(deserializer: D) -> Result<HashDigest, D::Error>
where
    D: Deserializer<'de>,
{
    Ok(HashDigest(deserialize_bytes32(deserializer)?))
}

impl Debug for HashDigest {
    fn fmt(&self, f: &mut Formatter<'_>) -> fmt::Result {
        write!(f, "{}", BASE32_NOPAD.encode(&self.0))
    }
}

impl Serialize for Ed25519PublicKey {
    fn serialize<S>(&self, serializer: S) -> Result<<S as Serializer>::Ok, <S as Serializer>::Error>
    where
        S: Serializer,
    {
        serializer.serialize_bytes(&self.0[..])
    }
}

impl<'de> Deserialize<'de> for Ed25519PublicKey {
    fn deserialize<D>(deserializer: D) -> Result<Self, D::Error>
    where
        D: Deserializer<'de>,
    {
        Ok(Ed25519PublicKey(
            deserializer.deserialize_bytes(U8_32Visitor)?,
        ))
    }
}

impl Debug for Ed25519PublicKey {
    fn fmt(&self, f: &mut Formatter<'_>) -> fmt::Result {
        write!(f, "{}", BASE32_NOPAD.encode(&self.0))
    }
}
