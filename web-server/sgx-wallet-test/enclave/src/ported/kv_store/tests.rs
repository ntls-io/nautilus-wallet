//! Tests for [`rtc_tenclave::kv_store`]

use std::prelude::v1::*;

use sgx_wallet_impl::ported::kv_store::in_memory::{InMemoryStore, Never};
use sgx_wallet_impl::ported::kv_store::KvStore;

pub(crate) fn test_mutate() -> Result<(), Never> {
    let mut store = InMemoryStore::default();

    assert_eq!(store.mutate("missing", |n| n + 1)?, None);

    store.save("existing", &2)?;
    assert_eq!(store.mutate("existing", |n| n + 1)?, Some(3));
    assert_eq!(store.load("existing")?, Some(3));

    Ok(())
}

pub(crate) fn test_try_insert() -> Result<(), Never> {
    let mut store = InMemoryStore::default();

    assert_eq!(store.try_insert("missing", &42)?, None);
    assert_eq!(store.load("missing")?, Some(42));

    store.save("existing", &5)?;
    assert_eq!(store.try_insert("existing", &42)?, Some(5));
    assert_eq!(store.load("existing")?, Some(5));

    Ok(())
}
