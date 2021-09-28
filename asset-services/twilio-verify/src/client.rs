//! A Rusty Twilio Verify API client.
//!
//! This wraps [`twilio_oai_verify_v2`].
//!
//! Docs: <https://www.twilio.com/docs/verify/api>

use env_var_helpers::env_vars;

use crate::exports::{api, models, ApiError, Configuration};
use crate::types::{CheckVerify, StartVerify};

pub struct VerifyClient {
    configuration: Configuration,
    service_sid: String,
}

impl VerifyClient {
    fn new(configuration: Configuration, service_sid: String) -> Self {
        Self {
            configuration,
            service_sid,
        }
    }

    pub fn from_env() -> Result<VerifyClient, env_vars::EnvVarError> {
        Ok(Self::new(
            get_configuration_from_env()?,
            env_vars::var("TWILIO_VERIFY_SERVICE_SID")?,
        ))
    }

    /// Fetch the verification service configuration for the current service.
    ///
    /// See: [`Self::fetch_service`]
    pub async fn fetch_current_service(
        &self,
    ) -> Result<models::VerifyV2Service, ApiError<api::FetchServiceError>> {
        let params = api::FetchServiceParams {
            sid: self.service_sid.clone(),
        };
        self.fetch_service(params).await
    }

    /// Fetch a verification service configuration.
    ///
    /// Docs: <https://www.twilio.com/docs/verify/api/service#fetch-a-service>
    pub async fn fetch_service(
        &self,
        params: api::FetchServiceParams,
    ) -> Result<models::VerifyV2Service, ApiError<api::FetchServiceError>> {
        let response = api::fetch_service(&self.configuration, params).await?;
        let service = match response.entity {
            Some(api::FetchServiceSuccess::Status200(service)) if response.status == 200 => service,
            _ => panic!("verification_check: unexpected response: {:?}", response),
        };
        Ok(service)
    }

    /// Start a new verification.
    ///
    /// Docs: <https://www.twilio.com/docs/verify/api/verification#start-new-verification>
    pub async fn start(
        &self,
        params: api::CreateVerificationParams,
    ) -> Result<models::VerifyV2ServiceVerification, ApiError<api::CreateVerificationError>> {
        let response = api::create_verification(&self.configuration, params).await?;
        let verification = match response.entity {
            Some(api::CreateVerificationSuccess::Status201(verification))
                if response.status == 201 =>
            {
                verification
            }
            _ => panic!("verification: unexpected response: {:?}", response),
        };
        Ok(verification)
    }

    /// Construct a valid request for [`Self::start`].
    pub fn start_params(&self, start: StartVerify) -> api::CreateVerificationParams {
        api::CreateVerificationParams {
            service_sid: self.service_sid.clone(),
            channel: start.api_channel(),
            to: start.api_to(),
            ..api::CreateVerificationParams::default()
        }
    }

    /// Submit a code for a verification check.
    ///
    /// Docs: <https://www.twilio.com/docs/verify/api/verification-check#check-a-verification>
    pub async fn check(
        &self,
        params: api::CreateVerificationCheckParams,
    ) -> Result<models::VerifyV2ServiceVerificationCheck, ApiError<api::CreateVerificationCheckError>>
    {
        let response = api::create_verification_check(&self.configuration, params).await?;
        let check = match response.entity {
            Some(api::CreateVerificationCheckSuccess::Status201(check))
                // XXX: spec mismatch
                if response.status == 200 =>
            {
                check
            }
            _ => panic!("verification_check: unexpected response: {:?}", response),
        };
        Ok(check)
    }

    /// Construct a valid request for [`Self::check`].
    pub fn check_params(&self, check: CheckVerify) -> api::CreateVerificationCheckParams {
        api::CreateVerificationCheckParams {
            service_sid: self.service_sid.clone(),
            ..check.add_to_params(api::CreateVerificationCheckParams::default())
        }
    }
}

fn get_configuration_from_env() -> Result<Configuration, env_vars::EnvVarError> {
    Ok(get_configuration(
        env_vars::var("TWILIO_ACCOUNT_SID")?,
        env_vars::var("TWILIO_AUTH_TOKEN")?,
    ))
}

fn get_configuration(account_sid: String, auth_token: String) -> Configuration {
    Configuration {
        basic_auth: Some((account_sid, Some(auth_token))),
        ..Configuration::default()
    }
}
