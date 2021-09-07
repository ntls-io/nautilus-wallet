//! Macros to reduce schema boilerplate.

#![allow(clippy::single_component_path_imports)] // false positive

/// Derive common traits for schema data types.
macro_rules! derive_schema_traits {
    ($i:item) => {
        #[derive(Clone, Eq, PartialEq, Debug)] // core
        #[derive(Deserialize, Serialize)] // serde
        #[derive(Zeroize)] // zeroize
        #[zeroize(drop)]
        $i
    };
}

pub(crate) use derive_schema_traits;
