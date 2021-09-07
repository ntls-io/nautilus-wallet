//! Data types and schema for communicating with the wallet enclave.
//!
//! TODO: Migrate these to a separate library crate that can be used from both std and SGX crates.
//!
//! # Related
//!
//! * <https://developer.algorand.org/docs/reference/rest-apis/kmd/>

pub mod actions;
pub mod entities;
mod macros;
pub mod msgpack;
pub mod sealing;
pub(crate) mod serde_bytes_array;
pub mod types;
