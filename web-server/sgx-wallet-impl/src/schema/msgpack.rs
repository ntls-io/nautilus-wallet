//! MessagePack helper traits.

use std::prelude::v1::{Box, Vec};

use rmp_serde::{decode, encode};
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
        rmp_serde::to_vec_named(self).map(Vec::into_boxed_slice)
    }
}

// Blanket impls for serde types:

impl<'de, T> FromMessagePack<'de> for T where T: Deserialize<'de> {}

impl<T> FromMessagePackOwned for T where T: DeserializeOwned {}

impl<T> ToMessagePack for T where T: Serialize {}
