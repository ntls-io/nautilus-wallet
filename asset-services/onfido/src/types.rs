//! Types for use with the Onfido API.
//!
//! Docs: <https://documentation.onfido.com/>
//!
//! See also: [`crate::convert`]

use std::convert::TryFrom;

use serde::{Deserialize, Serialize};

use crate::exports::models;

/// Part of <https://documentation.onfido.com/#document-object>.
///
/// Docs: <https://documentation.onfido.com/#document-types>
#[derive(Clone, Eq, PartialEq, Debug)] // core
#[derive(Deserialize, Serialize)] // serde
#[serde(rename_all = "snake_case")]
pub enum DocumentType {
    DrivingLicence,
    NationalHealthInsuranceCard,
    NationalIdentityCard,
    Passport,
    ResidencePermit,
    TaxId,
    Visa,
    VoterId,
    WorkPermit,
}

/// Part of <https://documentation.onfido.com/#document-object>
#[derive(Copy, Clone, Eq, PartialEq, Debug)] // core
#[derive(Deserialize, Serialize)] // serde
#[serde(rename_all = "snake_case")]
pub enum DocumentSide {
    Front,
    Back,
}

/// A created [`models::Applicant`], with checked required fields.
///
/// Use [`TryFrom`] / [`TryInto`] to convert [`models::Applicant`] to [`CreatedApplicant`].
#[derive(Clone, PartialEq, Debug)] // core
#[derive(Deserialize, Serialize)] // serde
pub struct CreatedApplicant {
    // Required fields:
    pub id: String,
    pub created_at: String,
    pub href: String,
    pub first_name: String,
    pub last_name: String,
    // Remaining optional fields:
    pub delete_at: Option<String>,
    pub sandbox: Option<bool>,
    pub email: Option<String>,
    pub dob: Option<String>,
    pub address: Option<Box<models::Address>>,
    pub id_numbers: Option<Vec<models::IdNumber>>,
}

impl TryFrom<models::Applicant> for CreatedApplicant {
    type Error = models::Applicant;

    fn try_from(applicant: models::Applicant) -> Result<Self, Self::Error> {
        match applicant {
            models::Applicant {
                id: Some(id),
                created_at: Some(created_at),
                delete_at,
                href: Some(href),
                sandbox,
                first_name: Some(first_name),
                last_name: Some(last_name),
                email,
                dob,
                address,
                id_numbers,
            } => Ok(CreatedApplicant {
                id,
                created_at,
                delete_at,
                href,
                sandbox,
                first_name,
                last_name,
                email,
                dob,
                address,
                id_numbers,
            }),
            incomplete_applicant => Err(incomplete_applicant),
        }
    }
}

impl From<CreatedApplicant> for models::Applicant {
    fn from(
        CreatedApplicant {
            id,
            created_at,
            href,
            first_name,
            last_name,
            delete_at,
            sandbox,
            email,
            dob,
            address,
            id_numbers,
        }: CreatedApplicant,
    ) -> Self {
        Self {
            id: Some(id),
            created_at: Some(created_at),
            delete_at,
            href: Some(href),
            sandbox,
            first_name: Some(first_name),
            last_name: Some(last_name),
            email,
            dob,
            address,
            id_numbers,
        }
    }
}
