//! Type conversions for Onfido API values.

use isocountry::CountryCode;
use serde::Serialize;
use serde_json::Value;

use crate::types::{DocumentSide, DocumentType};

/// Convert values to a representation accepted by the Onfido API.
pub trait ToApi {
    /// The associated Onfido API-compatible type.
    type T;

    /// Convert this value.
    fn to_api(self) -> Self::T;
}

/// Blanket implementation for optional values.
impl<T> ToApi for Option<T>
where
    T: ToApi,
{
    type T = Option<T::T>;

    fn to_api(self) -> Self::T {
        self.map(T::to_api)
    }
}

/// ```
/// # use onfido::convert::ToApi;
/// # use onfido::types::DocumentType;
///
/// assert_eq!(DocumentType::NationalIdentityCard.to_api(), "national_identity_card");
/// assert_eq!(DocumentType::Passport.to_api(), "passport");
/// ```
impl ToApi for DocumentType {
    type T = String;

    fn to_api(self) -> Self::T {
        serde_string(self)
    }
}

/// ```
/// # use onfido::convert::ToApi;
/// # use onfido::types::{DocumentSide };
///
/// assert_eq!(DocumentSide::Front.to_api(), "front");
/// assert_eq!(DocumentSide::Back.to_api(), "back");
/// ```
impl ToApi for DocumentSide {
    type T = String;

    fn to_api(self) -> Self::T {
        serde_string(self)
    }
}

/// Onfido expects ISO 3166-1 alpha-3.
///
/// ```
/// # use isocountry::CountryCode;
/// # use onfido::convert::ToApi;
///
/// assert_eq!(CountryCode::ZAF.to_api(), "ZAF");
/// ```
impl ToApi for CountryCode {
    type T = &'static str;

    fn to_api(self) -> Self::T {
        self.alpha3()
    }
}

/// Internal helper: get value as a string in serde's data model.
/// # Panics
/// If value does not represent a string.
fn serde_string(value: impl Serialize) -> String {
    match serde_json::to_value(value).expect("serde_string: serialization failed") {
        Value::String(s) => s,
        other => panic!("serde_string: expected String, got {:?}", other),
    }
}
