//! Based on: <https://github.com/apache/incubator-teaclave-sgx-sdk/blob/master/samplecode/unit-test/enclave/src/test_path.rs>
//!
//! Note: Requires `sgx_env.edl`

use std::env;
use std::path::{Path, PathBuf};
use std::untrusted::fs;

use sgx_rand::{Rng, SgxRng};

pub struct TempDir(PathBuf);

impl TempDir {
    pub(crate) fn create() -> Self {
        let p = env::temp_dir();
        let mut r = SgxRng::new().unwrap();
        let ret = p.join(&format!("sgx_rust-{}", r.next_u32()));
        fs::create_dir(&ret).unwrap();
        TempDir(ret)
    }
}

impl AsRef<Path> for TempDir {
    fn as_ref(&self) -> &Path {
        &self.0
    }
}

impl Drop for TempDir {
    fn drop(&mut self) {
        fs::remove_dir_all(self).unwrap();
    }
}
