use data_encoding::BASE64;
use serde::de::Visitor;
use serde::{Deserialize, Deserializer, Serializer};

pub struct SignatureVisitor;

pub struct U8_32Visitor;

impl<'de> Visitor<'de> for SignatureVisitor {
    type Value = [u8; 64];

    fn expecting(&self, formatter: &mut std::fmt::Formatter) -> std::fmt::Result {
        formatter.write_str("a 64 byte array")
    }

    fn visit_bytes<E>(self, v: &[u8]) -> Result<Self::Value, E>
    where
        E: serde::de::Error,
    {
        if v.len() == 64 {
            let mut bytes = [0; 64];
            bytes.copy_from_slice(v);
            Ok(bytes)
        } else {
            Err(E::custom(format!("Invalid signature length: {}", v.len())))
        }
    }
}

impl<'de> Visitor<'de> for U8_32Visitor {
    type Value = [u8; 32];

    fn expecting(&self, formatter: &mut std::fmt::Formatter) -> std::fmt::Result {
        formatter.write_str("a 32 byte array")
    }

    fn visit_bytes<E>(self, v: &[u8]) -> Result<Self::Value, E>
    where
        E: serde::de::Error,
    {
        if v.len() == 32 {
            let mut bytes = [0; 32];
            bytes.copy_from_slice(v);
            Ok(bytes)
        } else {
            Err(E::custom(format!("Invalid byte array length: {}", v.len())))
        }
    }
}

pub fn deserialize_bytes32<'de, D>(deserializer: D) -> Result<[u8; 32], D::Error>
where
    D: Deserializer<'de>,
{
    let s = <&str>::deserialize(deserializer)?;
    let mut decoded = [0; 32];
    decoded.copy_from_slice(&BASE64.decode(s.as_bytes()).unwrap());
    Ok(decoded)
}
