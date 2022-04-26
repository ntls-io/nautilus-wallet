//! Data types and schema for communicating with the wallet enclave.
//!
//! Schema types should generally derive at least the following traits:
//!
//! ```compile_fail
//! #[derive(Clone, Eq, PartialEq, Debug)] // core
//! #[derive(Deserialize, Serialize)] // serde
//! ```
//!
//! Types that contain sensitive data (roughly, anything that should not leave the enclave)
//! should also implement `Zeroize`:
//!
//! ```compile_fail
//! #[derive(Zeroize, ZeroizeOnDrop)] // zeroize
//! ```
//!
//! TODO: Migrate these to a separate library crate that can be used from both std and SGX crates.
//!
//! # Related
//!
//! * <https://developer.algorand.org/docs/reference/rest-apis/kmd/>

pub mod actions;
pub mod entities;
pub mod msgpack;
pub mod sealing;
pub(crate) mod serde_bytes_array;
pub mod types;
