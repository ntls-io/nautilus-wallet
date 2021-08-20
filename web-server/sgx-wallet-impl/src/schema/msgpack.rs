//! MessagePack helper traits.

use std::prelude::v1::{Box, Vec};

use rmp_serde::{decode, encode, Serializer};
use serde::de::DeserializeOwned;
use serde::{Deserialize, Serialize};

pub trait FromMessagePack<'de>: Deserialize<'de> {
    fn from_msgpack(bytes: &'de [u8]) -> Result<Self, decode::Error> {
        rmp_serde::from_read_ref(bytes)
    }
}

pub trait FromMessagePackOwned: DeserializeOwned {
    fn from_msgpack_owned(bytes: &[u8]) -> Result<Self, decode::Error>
    where
        Self: DeserializeOwned,
    {
        rmp_serde::from_read_ref(bytes)
    }
}

pub trait ToMessagePack: Serialize {
    fn to_msgpack(&self) -> Result<Box<[u8]>, encode::Error> {
        // XXX: Like rmp_serde::to_vec_named, but we need string variants too.
        let mut wr = Vec::with_capacity(128);
        let mut se = Serializer::new(&mut wr)
            .with_struct_map()
            .with_string_variants();
        self.serialize(&mut se)?;
        Ok(wr.into_boxed_slice())
    }
}

// Blanket impls for serde types:

impl<'de, T> FromMessagePack<'de> for T where T: Deserialize<'de> {}

impl<T> FromMessagePackOwned for T where T: DeserializeOwned {}

impl<T> ToMessagePack for T where T: Serialize {}
