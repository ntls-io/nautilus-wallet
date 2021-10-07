use std::convert::{Infallible, TryInto};
use std::io;

use env_var_helpers::env_vars;
use isocountry::CountryCode;
use onfido_openapi::apis::ResponseContent;

use crate::convert::ToApi;
use crate::exports::models::SdkToken;
use crate::exports::{api, models, ApiError, ApiKey, Configuration};
use crate::types::{CreatedApplicant, DocumentSide, DocumentType};

pub struct OnfidoClient {
    configuration: Configuration,
}

impl OnfidoClient {
    pub fn new(configuration: Configuration) -> Self {
        Self { configuration }
    }

    pub fn from_env() -> Result<OnfidoClient, env_vars::EnvVarError> {
        Ok(Self::new(get_configuration_from_env()?))
    }

    /// Call Onfido's ping / health check endpoint.
    ///
    /// This should return the string `"OK"`.
    ///
    /// Docs: <https://documentation.onfido.com/#ping>
    pub async fn ping(&self) -> Result<String, ApiError<Infallible>> {
        let client = &self.configuration.client;
        let request = client
            .get(format!("{}/ping", self.configuration.base_path))
            .build()?;
        let body = client
            .execute(request)
            .await?
            .error_for_status()?
            .text()
            .await?;
        Ok(body)
    }

    /// Create a new applicant.
    ///
    /// Docs: <https://documentation.onfido.com/#create-applicant>
    pub async fn create_applicant(
        &self,
        applicant: models::Applicant,
    ) -> Result<CreatedApplicant, ApiError<api::CreateApplicantError>> {
        let unchecked_applicant = api::create_applicant(&self.configuration, applicant).await?;
        let created_applicant = unchecked_applicant
            .try_into()
            .map_err(|incomplete_applicant| {
                io::Error::new(
                    io::ErrorKind::InvalidInput,
                    format!(
                        "malformed create_applicant response, required fields missing: {:#?}",
                        incomplete_applicant
                    ),
                )
            })?;
        Ok(created_applicant)
    }

    /// Construct a valid request for [`Self::create_applicant`].
    pub fn create_applicant_param(
        &self,
        first_name: String,
        last_name: String,
    ) -> models::Applicant {
        models::Applicant {
            first_name: Some(first_name),
            last_name: Some(last_name),
            ..models::Applicant::default()
        }
    }

    /// Generates a new input-capture SDK token.
    ///
    /// Tokens are restricted to an individual applicant, and expire after 90 minutes.
    ///
    /// Docs: <https://documentation.onfido.com/#generate-sdk-token>
    pub async fn generate_sdk_token(
        &self,
        applicant_id: String,
    ) -> Result<String, ApiError<api::GenerateSdkTokenError>> {
        let params = models::SdkToken {
            applicant_id: Some(applicant_id),
            // TODO: Support a server-configured referrer pattern.
            //       This prevents compromised SDK tokens from being used by malicious origins.
            // For now, explicitly match any referrer.
            // Docs: <https://documentation.onfido.com/#the-referrer-argument>
            referrer: Some("*".to_string()),
            ..models::SdkToken::new()
        };
        match api::generate_sdk_token(&self.configuration, params).await? {
            SdkToken {
                token: Some(token), ..
            } => Ok(token),
            sdk_token => Err(ApiError::Io(io::Error::new(
                io::ErrorKind::InvalidInput,
                format!(
                    "malformed sdk_token response: expected token field, got {:#?}",
                    sdk_token
                ),
            ))),
        }
    }

    /// Upload an applicant's document.
    ///
    /// Docs: <https://documentation.onfido.com/#upload-document>
    pub async fn upload_document(
        &self,
        applicant_id: impl AsRef<str>,
        document_type: DocumentType,
        file: Vec<u8>,
        document_side: Option<DocumentSide>,
        issuing_country: Option<CountryCode>,
    ) -> Result<models::Document, ApiError<api::UploadDocumentError>> {
        let uploaded = api::upload_document(
            &self.configuration,
            applicant_id.as_ref(),
            document_type.to_api().as_ref(),
            file,
            document_side.to_api().as_deref(),
            issuing_country.to_api(),
        )
        .await?;
        Ok(uploaded)
    }

    /// Docs: <https://documentation.onfido.com/#upload-live-photo>
    pub async fn upload_live_photo(
        &self,
        applicant_id: impl AsRef<str>,
        file: Vec<u8>,
        advanced_validation: Option<bool>,
    ) -> Result<models::LivePhoto, ApiError<api::UploadLivePhotoError>> {
        api::upload_live_photo(
            &self.configuration,
            applicant_id.as_ref(),
            file,
            advanced_validation,
        )
        .await
    }

    /// Initiate a new check for an applicant.
    ///
    /// Docs: <https://documentation.onfido.com/#create-check>
    pub async fn create_check(
        &self,
        check: models::Check,
    ) -> Result<models::Check, ApiError<api::CreateCheckError>> {
        api::create_check(&self.configuration, check).await
    }

    /// Construct a valid request for [`Self::create_check`].
    pub fn create_check_param(
        &self,
        applicant_id: String,
        report_names: Vec<String>,
    ) -> models::Check {
        models::Check {
            applicant_id: Some(applicant_id),
            report_names: Some(report_names),
            ..models::Check::default()
        }
    }

    /// Retrieve a check.
    ///
    /// Docs: <https://documentation.onfido.com/#retrieve-check>
    pub async fn retrieve_check(
        &self,
        check_id: impl AsRef<str>,
    ) -> Result<models::Check, ApiError<api::FindCheckError>> {
        api::find_check(&self.configuration, check_id.as_ref()).await
    }
}

fn get_configuration_from_env() -> Result<Configuration, env_vars::EnvVarError> {
    Ok(get_configuration(env_vars::var("ONFIDO_API_TOKEN")?))
}

fn get_configuration(api_token: impl AsRef<str>) -> Configuration {
    let api_key = Some(ApiKey {
        prefix: Some("Token".to_string()),
        key: format!("token={}", api_token.as_ref()),
    });
    Configuration {
        api_key,
        ..Configuration::default()
    }
}

/// Extract the response content from `err`, if any.
pub fn api_error_response<T>(err: &ApiError<T>) -> Option<ResponseContent<T>>
where
    T: Clone,
{
    match err {
        ApiError::ResponseError(content) => Some(content.clone()),
        _ => None,
    }
}
