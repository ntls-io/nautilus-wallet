//! Test [`sgx_wallet_impl::schema::types`]

use serde_json::Value;
use sgx_wallet_impl::schema::types::XrplKeyType;

/// [`XrplKeyType`] serializes to the same lowercase string constants used throughout the XRP Ledger.
pub(crate) fn test_xrpl_key_type_serde() {
    let pairs = [
        (XrplKeyType::Secp256k1, "secp256k1"),
        (XrplKeyType::Ed25519, "ed25519"),
    ];
    for (key_type, expected) in pairs {
        let expected_json = Value::from(expected);
        assert_eq!(serde_json::to_value(&key_type).unwrap(), expected_json);
        assert_eq!(
            serde_json::from_value::<XrplKeyType>(expected_json).unwrap(),
            key_type
        );
    }
}
