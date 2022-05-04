//! A Rusty Twilio Messaging API client.
//!
//! This wraps [`twilio_oai_api_v1`].
//!
//! Docs: <https://www.twilio.com/docs/sms/api>

use env_var_helpers::env_vars;
use phonenumber::Mode::E164;
use phonenumber::PhoneNumber;

use crate::exports::{api, models, ApiError, Configuration};
use crate::types::{AccountSid, MessageSid, ServiceSid};

pub struct MessagingClient {
    configuration: Configuration,
    account_sid: AccountSid,
    service_sid: ServiceSid,
}

impl MessagingClient {
    fn new(configuration: Configuration, account_sid: AccountSid, service_sid: ServiceSid) -> Self {
        Self {
            configuration,
            account_sid,
            service_sid,
        }
    }

    pub fn from_env() -> Result<MessagingClient, env_vars::EnvVarError> {
        let (configuration, account_sid) = get_configuration_from_env()?;
        let service_sid = env_vars::var("TWILIO_MESSAGING_SERVICE_SID")?;
        Ok(Self::new(configuration, account_sid, service_sid))
    }

    /// Fetch an account resource.
    ///
    /// Docs: <https://www.twilio.com/docs/iam/api/account#fetch-an-account-resource>
    pub async fn fetch_account(
        &self,
        account_sid: AccountSid,
    ) -> Result<models::ApiV2010Account, ApiError<api::FetchAccountError>> {
        let params = api::FetchAccountParams { sid: account_sid };
        let response = api::fetch_account(&self.configuration, params).await?;
        let account = match response.entity {
            Some(api::FetchAccountSuccess::Status200(account)) if response.status == 200 => account,
            _ => panic!("fetch_account: unexpected response: {:?}", response),
        };
        Ok(account)
    }

    /// Fetch the account resource for the current service.
    pub async fn fetch_current_account(
        &self,
    ) -> Result<models::ApiV2010Account, ApiError<api::FetchAccountError>> {
        self.fetch_account(self.account_sid.clone()).await
    }

    /// Send a new outgoing message.
    ///
    /// Docs: <https://www.twilio.com/docs/sms/api/message-resource#create-a-message-resource>
    pub async fn create_message(
        &self,
        params: api::CreateMessageParams,
    ) -> Result<models::ApiV2010AccountMessage, ApiError<api::CreateMessageError>> {
        let response = api::create_message(&self.configuration, params).await?;
        let message = match response.entity {
            Some(api::CreateMessageSuccess::Status201(message)) if response.status == 201 => {
                message
            }
            _ => panic!("create_message: unexpected response: {:?}", response),
        };
        Ok(message)
    }

    /// Construct a valid request for [`Self::create_message`].
    pub fn create_message_params(&self, to: PhoneNumber, body: String) -> api::CreateMessageParams {
        api::CreateMessageParams {
            account_sid: self.account_sid.clone(),
            to: to.format().mode(E164).to_string(),
            messaging_service_sid: Some(self.service_sid.clone()),
            body: Some(body),
            ..api::CreateMessageParams::default()
        }
    }

    /// Fetch a sent message.
    ///
    /// Docs: <https://www.twilio.com/docs/sms/api/message-resource#create-a-message-resource>
    pub async fn fetch_message(
        &self,
        params: api::FetchMessageParams,
    ) -> Result<models::ApiV2010AccountMessage, ApiError<api::FetchMessageError>> {
        let response = api::fetch_message(&self.configuration, params).await?;
        let message = match response.entity {
            Some(api::FetchMessageSuccess::Status200(message)) if response.status == 200 => message,
            _ => panic!("fetch_message: unexpected response: {:?}", response),
        };
        Ok(message)
    }

    /// Construct a valid request for [`Self::fetch_message`].
    pub fn fetch_message_params(&self, message_sid: MessageSid) -> api::FetchMessageParams {
        api::FetchMessageParams {
            account_sid: self.account_sid.clone(),
            sid: message_sid,
        }
    }
}

fn get_configuration_from_env() -> Result<(Configuration, AccountSid), env_vars::EnvVarError> {
    Ok(get_configuration(
        env_vars::var("TWILIO_ACCOUNT_SID")?,
        env_vars::var("TWILIO_AUTH_TOKEN")?,
    ))
}

fn get_configuration(account_sid: AccountSid, auth_token: String) -> (Configuration, AccountSid) {
    let configuration = Configuration {
        basic_auth: Some((account_sid.clone(), Some(auth_token))),
        ..Configuration::default()
    };
    (configuration, account_sid)
}
