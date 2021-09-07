use std::prelude::v1::*;

use proptest::prelude::*;
use sgx_wallet_impl::ported::kv_store::fs::{decode_from_fs_safe, encode_to_fs_safe};
use sgx_wallet_impl::ported::kv_store::Key;

/// [`encode_to_fs_safe`] encodes to filesystem-safe, and [`decode_from_fs_safe`] round-trips.
pub(crate) fn prop_fs_safe_roundtrip() {
    prop_fs_safe_roundtrip_wrapper()
}

proptest! {
    fn prop_fs_safe_roundtrip_wrapper(key: Box<Key>) {
        prop_fs_safe_roundtrip_impl(&key)?;
    }
}

fn prop_fs_safe_roundtrip_impl(key: &Key) -> Result<(), TestCaseError> {
    let encoded = &encode_to_fs_safe(key);
    prop_assert!(
        is_fs_safe(encoded),
        "expected filesystem-safe, got encoded = {:?}",
        encoded
    );
    let decoded = &decode_from_fs_safe(encoded).unwrap();
    prop_assert_eq!(key, decoded);
    Ok(())
}

/// Helper: Very conservative definition of filesystem-safe.
fn is_fs_safe(encoded: &str) -> bool {
    !encoded.is_empty() && encoded.chars().all(|c| c.is_ascii_alphanumeric())
}
