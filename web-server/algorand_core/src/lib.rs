#![no_std]
use algorand_crypto::Ed25519PublicKey;
use algorand_encoding::{SignatureVisitor, U8_32Visitor};
use data_encoding::BASE32_NOPAD;
use data_encoding::BASE64;
use derive_more::{Add, Display, Sub};
use serde::{Deserialize, Deserializer, Serialize, Serializer};
use sha2::Digest;
use static_assertions::_core::ops::{Add, Sub};
use std::fmt::{self, Debug, Formatter};
use std::{ops::Mul, str::FromStr};

pub const MICRO_ALGO_CONVERSION_FACTOR: f64 = 1e6;

/// MicroAlgos are the base unit of currency in Algorand
#[derive(
    Copy,
    Clone,
    Default,
    Debug,
    Ord,
    PartialOrd,
    Eq,
    PartialEq,
    Serialize,
    Deserialize,
    Display,
    Add,
    Sub,
)]
pub struct MicroAlgos(pub u64);

impl MicroAlgos {
    pub fn to_algos(self) -> f64 {
        self.0 as f64 / MICRO_ALGO_CONVERSION_FACTOR
    }

    pub fn from_algos(algos: f64) -> MicroAlgos {
        MicroAlgos((algos * MICRO_ALGO_CONVERSION_FACTOR) as u64)
    }
}

impl Add<u64> for MicroAlgos {
    type Output = Self;

    fn add(self, rhs: u64) -> Self::Output {
        MicroAlgos(self.0 + rhs)
    }
}

// Intentionally not implementing Mul<Rhs=Self>
// If you're multiplying a MicroAlgos by MicroAlgos, something has gone wrong in your math
// That would give you MicroAlgos squared and those don't exist
impl Mul<u64> for MicroAlgos {
    type Output = Self;

    fn mul(self, rhs: u64) -> Self::Output {
        MicroAlgos(self.0 * rhs)
    }
}

type ChecksumAlg = sha2::Sha512Trunc256;

const CHECKSUM_LEN: usize = 4;
const HASH_LEN: usize = 32;

/// Public key address
#[derive(Copy, Clone, Eq, PartialEq)]
pub struct Address(pub [u8; HASH_LEN]);

impl Address {
    pub fn new(bytes: [u8; HASH_LEN]) -> Address {
        Address(bytes)
    }

    /// Encode to base32 string with checksum
    fn encode_as_string(&self) -> String {
        let hashed = ChecksumAlg::digest(&self.0);
        let checksum = &hashed[(HASH_LEN - CHECKSUM_LEN)..];
        let checksum_address = [&self.0, checksum].concat();
        BASE32_NOPAD.encode(&checksum_address)
    }
}

impl Debug for Address {
    fn fmt(&self, f: &mut Formatter<'_>) -> fmt::Result {
        write!(f, "{}", self.encode_as_string())
    }
}

impl Serialize for Address {
    fn serialize<S>(&self, serializer: S) -> Result<<S as Serializer>::Ok, <S as Serializer>::Error>
    where
        S: Serializer,
    {
        serializer.serialize_bytes(&self.0[..])
    }
}

/// Round of the Algorand consensus protocol
#[derive(Copy, Clone, Default, Eq, PartialEq, Debug, Serialize, Deserialize, Display, Add, Sub)]
pub struct Round(pub u64);

/// Participation public key used in key registration transactions
#[derive(Copy, Clone, Eq, PartialEq, Debug)]
pub struct VotePk(pub [u8; 32]);

impl Serialize for VotePk {
    fn serialize<S>(&self, serializer: S) -> Result<<S as Serializer>::Ok, <S as Serializer>::Error>
    where
        S: Serializer,
    {
        serializer.serialize_bytes(&self.0[..])
    }
}

impl<'de> Deserialize<'de> for VotePk {
    fn deserialize<D>(deserializer: D) -> Result<Self, D::Error>
    where
        D: Deserializer<'de>,
    {
        Ok(VotePk(deserializer.deserialize_bytes(U8_32Visitor)?))
    }
}

/// VRF public key used in key registration transaction
#[derive(Copy, Clone, Eq, PartialEq, Debug)]
pub struct VrfPk(pub [u8; 32]);

impl Serialize for VrfPk {
    fn serialize<S>(&self, serializer: S) -> Result<<S as Serializer>::Ok, <S as Serializer>::Error>
    where
        S: Serializer,
    {
        serializer.serialize_bytes(&self.0[..])
    }
}

impl<'de> Deserialize<'de> for VrfPk {
    fn deserialize<D>(deserializer: D) -> Result<Self, D::Error>
    where
        D: Deserializer<'de>,
    {
        Ok(VrfPk(deserializer.deserialize_bytes(U8_32Visitor)?))
    }
}

/// An Ed25519 Signature
#[derive(Copy, Clone, PartialEq, Eq)]
pub struct Signature(pub [u8; 64]);

impl Debug for Signature {
    fn fmt(&self, f: &mut Formatter<'_>) -> std::fmt::Result {
        write!(f, "{}", &BASE64.encode(&self.0))
    }
}

impl Serialize for Signature {
    fn serialize<S>(&self, serializer: S) -> Result<<S as Serializer>::Ok, <S as Serializer>::Error>
    where
        S: Serializer,
    {
        serializer.serialize_bytes(&self.0[..])
    }
}

impl<'de> Deserialize<'de> for Signature {
    fn deserialize<D>(deserializer: D) -> Result<Self, D::Error>
    where
        D: Deserializer<'de>,
    {
        Ok(Signature(deserializer.deserialize_bytes(SignatureVisitor)?))
    }
}

#[derive(Default, Debug, Eq, PartialEq, Clone, Deserialize)]
pub struct MultisigSignature {
    #[serde(rename = "subsig")]
    pub subsigs: Vec<MultisigSubsig>,

    #[serde(rename = "thr")]
    pub threshold: u8,

    #[serde(rename = "v")]
    pub version: u8,
}

impl Serialize for MultisigSignature {
    fn serialize<S>(&self, serializer: S) -> Result<<S as Serializer>::Ok, <S as Serializer>::Error>
    where
        S: Serializer,
    {
        // For some reason SerializeStruct ends up serializing as an array, so this explicitly serializes as a map
        use serde::ser::SerializeMap;
        let mut state = serializer.serialize_map(Some(3))?;
        state.serialize_entry("subsig", &self.subsigs)?;
        state.serialize_entry("thr", &self.threshold)?;
        state.serialize_entry("v", &self.version)?;
        state.end()
    }
}

#[derive(Debug, Eq, PartialEq, Clone, Deserialize)]
pub struct MultisigSubsig {
    #[serde(rename = "pk")]
    pub key: Ed25519PublicKey,

    #[serde(rename = "s")]
    pub sig: Option<Signature>,
}

impl Serialize for MultisigSubsig {
    fn serialize<S>(&self, serializer: S) -> Result<<S as Serializer>::Ok, <S as Serializer>::Error>
    where
        S: Serializer,
    {
        use serde::ser::SerializeMap;
        let len = if self.sig.is_some() { 2 } else { 1 };
        let mut state = serializer.serialize_map(Some(len))?;
        state.serialize_entry("pk", &self.key)?;
        if let Some(sig) = &self.sig {
            state.serialize_entry("s", sig)?;
        }
        state.end()
    }
}

pub trait ToMsgPack: Serialize {
    fn to_msg_pack(&self) -> Result<Vec<u8>, rmp_serde::encode::Error> {
        rmp_serde::to_vec_named(&self)
    }
}

#[derive(Debug, Eq, PartialEq, Clone)]
pub struct SignedLogic {
    pub logic: CompiledTeal,
    pub args: Vec<Vec<u8>>,
    pub sig: LogicSignature,
}

#[derive(Debug, Eq, PartialEq, Clone)]
pub struct CompiledTeal {
    /// base32 SHA512_256 of program bytes (Address style)
    pub hash: String,
    pub bytes: Vec<u8>,
}

#[derive(Debug, Eq, PartialEq, Clone)]
pub enum LogicSignature {
    ContractAccount,
    DelegatedSig(Signature),
    DelegatedMultiSig(MultisigSignature),
}
