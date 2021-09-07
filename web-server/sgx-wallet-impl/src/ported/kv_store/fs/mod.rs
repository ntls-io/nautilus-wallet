//! Filesystem-based [`KvStore`] implementation
//!
//! XXX port note: Added phantom `value_type` to `FsStore`.

pub mod sgx_filer;

// sgx_tstd (v1.1.3) does not support `fs::read_dir`, so limit the following to tests, for now.
//
// See: https://github.com/apache/incubator-teaclave-sgx-sdk/blob/v1.1.3/release_notes.md#partially-supported-modstraits-in-sgx_tstd
use core::marker::PhantomData;
use std::io;
use std::path::{Path, PathBuf};
use std::prelude::v1::*;

use serde::de::DeserializeOwned;
use serde::Serialize;
pub use sgx_filer::SgxFiler;

use super::KvStore;
use crate::ported::kv_store::Key;

/// Simplified interface for reading and writing files.
pub trait Filer {
    /// Read content of `path`, if any.
    ///
    /// Return [`None`] if `path` doesn't exist.
    ///
    fn get(&self, path: impl AsRef<Path>) -> io::Result<Option<Vec<u8>>>;

    /// Write `content` to `path`. Discard any existing content.
    fn put(&self, path: impl AsRef<Path>, content: impl AsRef<[u8]>) -> io::Result<()>;

    /// Delete `path`. Discard any existing content.
    fn delete(&self, path: impl AsRef<Path>) -> io::Result<()>;
}

/// [`KvStore`] using a file per key under `root_dir`.
pub struct FsStore<F, V>
where
    F: Filer,
    V: Serialize + DeserializeOwned,
{
    pub(crate) root_dir: PathBuf,
    pub(crate) filer: F,
    value_type: PhantomData<V>,
}

impl<F, V> FsStore<F, V>
where
    F: Filer,
    V: Serialize + DeserializeOwned,
{
    /// # Note
    ///
    /// The caller must ensure that `root` exists as a directory.
    ///
    pub fn new(root: impl AsRef<Path>, filer: F) -> Self {
        let root_dir = root.as_ref().to_path_buf();
        FsStore {
            root_dir,
            filer,
            value_type: PhantomData,
        }
    }

    /// Resolve file name for the value of `key`.
    fn value_path(&self, key: &Key) -> PathBuf {
        let file_name = encode_to_fs_safe(key);
        self.root_dir.join(file_name)
    }
}

impl<F, V> KvStore<V> for FsStore<F, V>
where
    F: Filer,
    V: Serialize + DeserializeOwned,
{
    // XXX: More explicit handling of serde_json::Error?
    type Error = io::Error;

    fn load(&self, key: &Key) -> Result<Option<V>, Self::Error> {
        let value_file_name = self.value_path(key);

        // Note: Read all the data into memory first, then deserialize, for efficiency.
        // See the docs for [`serde_json::de::from_reader`],
        // and https://github.com/serde-rs/json/issues/160
        let loaded: Option<Vec<u8>> = self.filer.get(&value_file_name).map_err(|err| {
            // XXX: Annotate err with some basic debugging context, for now.
            Self::Error::new(
                err.kind(),
                format!("FsStore: read from {:?} failed: {}", value_file_name, err),
            )
        })?;
        let value: Option<V> = loaded
            .map(|serialised: Vec<u8>| serde_json::from_slice(serialised.as_slice()))
            .transpose()?;
        Ok(value)
    }

    fn save(&mut self, key: &Key, value: &V) -> Result<(), Self::Error> {
        let value_file_name = self.value_path(key);
        let serialized: Vec<u8> = serde_json::to_vec(&value)?;
        self.filer
            .put(&value_file_name, serialized)
            .map_err(|err| {
                // XXX: Annotate err with some basic debugging context, for now.
                Self::Error::new(
                    err.kind(),
                    format!("FsStore: write to {:?} failed: {}", value_file_name, err),
                )
            })?;
        Ok(())
    }

    fn delete(&mut self, key: &Key) -> Result<(), Self::Error> {
        let path = self.value_path(key);
        self.filer.delete(path)?;
        Ok(())
    }
}

/// Helper: Make `key` filesystem-safe.
pub fn encode_to_fs_safe(key: &Key) -> String {
    let encoded = hex::encode(key);
    format!("x{}", encoded)
}

/// Inverse of [`encode_to_fs_safe`].
// FIXME: Just use a generic String as the error type, for now.
pub fn decode_from_fs_safe(file_name: &str) -> Result<Vec<u8>, String> {
    let encoded: &str = file_name
        .strip_prefix("x")
        .ok_or_else(|| format!("decode_from_fs_safe: missing x prefix for {:?}", file_name))?;
    let bytes: Vec<u8> = hex::decode(encoded).map_err(|err| err.to_string())?;
    Ok(bytes)
}
