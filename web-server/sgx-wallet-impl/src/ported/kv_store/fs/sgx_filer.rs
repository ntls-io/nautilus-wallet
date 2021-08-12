//! [`SgxFile`] support

use std::io::ErrorKind::NotFound;
use std::io::{Result, Write};
use std::path::Path;
use std::prelude::v1::Vec;

use sgx_tstd::sgxfs;
use sgx_tstd::sgxfs::SgxFile;

use super::Filer;

/// TODO: key management policy
pub struct SgxFiler;

// Default key management:
//
// * `protected_fs_file::generate_random_meta_data_key`
//   https://github.com/intel/linux-sgx/blob/sgx_2.13.3/sdk/protected_fs/sgx_tprotected_fs/file_crypto.cpp#L197
//
impl Filer for SgxFiler {
    fn get(&self, path: impl AsRef<Path>) -> Result<Option<Vec<u8>>> {
        // TODO: Create `read_ex` to read file with key
        match sgxfs::read(path) {
            Ok(contents) => Ok(Some(contents)),
            Err(error) if error.kind() == NotFound => Ok(None),
            Err(error) => Err(error),
        }
    }

    fn put(&self, path: impl AsRef<Path>, content: impl AsRef<[u8]>) -> Result<()> {
        let contents: &[u8] = content.as_ref();
        // TODO: create_ex with key
        let mut value_file = SgxFile::create(path)?;
        value_file.write_all(contents)
    }

    fn delete(&self, path: impl AsRef<Path>) -> Result<()> {
        match sgxfs::remove(path) {
            Err(error) if error.kind() == NotFound => Ok(()),
            result => result,
        }
    }
}
