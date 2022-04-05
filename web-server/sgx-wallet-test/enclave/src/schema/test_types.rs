//! Test [`sgx_wallet_impl::schema::types`]

use serde_json::Value;
use sgx_wallet_impl::schema::types::XrpKeyType;

/// [`XrpKeyType`] serializes to the same lowercase string constants used throughout the XRP Ledger.
pub(crate) fn test_xrp_key_type_serde() {
    let pairs = [
        (XrpKeyType::Secp256k1, "secp256k1"),
        (XrpKeyType::Ed25519, "ed25519"),
    ];
    for (key_type, expected) in pairs {
        let expected_json = Value::from(expected);
        assert_eq!(serde_json::to_value(&key_type).unwrap(), expected_json);
        assert_eq!(
            serde_json::from_value::<XrpKeyType>(expected_json).unwrap(),
            key_type
        );
    }
}
