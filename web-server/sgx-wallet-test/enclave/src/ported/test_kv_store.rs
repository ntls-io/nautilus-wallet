use serde::de::DeserializeOwned;
use serde::Serialize;
use sgx_wallet_impl::ported::kv_store::fs::{FsStore, SgxFiler};
use sgx_wallet_impl::ported::kv_store::KvStore;

use crate::helpers::temp_dir::TempDir;

// Helper: Run `f` with a non-existent file path inside a temporary directory.
fn with_temp_store<V>(f: impl FnOnce(&mut FsStore<SgxFiler, V>))
where
    V: Serialize + DeserializeOwned,
{
    let root = &TempDir::create();
    let mut store = FsStore::new(root, SgxFiler);
    f(&mut store);
}

pub(crate) fn test_load_save_delete() {
    with_temp_store(|store| {
        assert_eq!(store.load(b"key").unwrap(), None);
        store.save(b"key", &2).unwrap();
        assert_eq!(store.load(b"key").unwrap(), Some(2));
        store.save(b"key", &5).unwrap();
        assert_eq!(store.load(b"key").unwrap(), Some(5));
        store.delete(b"key").unwrap();
        assert_eq!(store.load(b"key").unwrap(), None);
    });
}

/// Like [`test_load_save_delete`], but using [`KvStore::alter`].
pub(crate) fn test_alter() {
    with_temp_store(|store| {
        assert_eq!(store.alter(b"key", |v| v).unwrap(), None);
        store.alter(b"key", |_| Some(2)).unwrap();
        assert_eq!(store.alter(b"key", |v| v).unwrap(), Some(2));
        store.alter(b"key", |_| Some(5)).unwrap();
        assert_eq!(store.alter(b"key", |v| v).unwrap(), Some(5));
        store.alter(b"key", |_| None).unwrap();
        assert_eq!(store.alter(b"key", |v| v).unwrap(), None);
    });
}

pub(crate) fn test_mutate() {
    with_temp_store(|store| {
        assert_eq!(store.mutate(b"missing", |n| n + 1).unwrap(), None);
        assert_eq!(store.load(b"missing").unwrap(), None);

        store.save(b"existing", &2).unwrap();
        assert_eq!(store.mutate(b"existing", |n| n + 1).unwrap(), Some(3));
        assert_eq!(store.load(b"existing").unwrap(), Some(3));
    });
}

pub(crate) fn test_try_insert() {
    with_temp_store(|store| {
        assert_eq!(store.try_insert(b"missing", &42).unwrap(), None);
        assert_eq!(store.load(b"missing").unwrap(), Some(42));

        store.save(b"existing", &5).unwrap();
        assert_eq!(store.try_insert(b"existing", &42).unwrap(), Some(5));
        assert_eq!(store.load(b"existing").unwrap(), Some(5));
    });
}
