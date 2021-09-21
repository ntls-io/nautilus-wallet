use std::str::FromStr;

use email_address_parser::EmailAddress;
use phonenumber::Mode::E164;
use phonenumber::PhoneNumber;

use crate::exports::api;
use crate::exports::api::CreateVerificationCheckParams;

/// A request to verify an email address or phone number.
///
/// For use with [`crate::client::VerifyClient::start_params`].
#[derive(Clone, Eq, PartialEq, Debug)]
pub enum StartVerify {
    EmailAddress(EmailAddress),
    PhoneNumber(PhoneNumber, PhoneNumberChannel),
}

#[derive(Clone, Eq, PartialEq, Debug)]
pub enum PhoneNumberChannel {
    Sms,
    Call,
}

impl StartVerify {
    /// Verify email address.
    pub fn email_address(email_address: impl AsRef<str>) -> Result<Self, String> {
        Ok(Self::EmailAddress(parse_email_address(email_address)?))
    }

    /// Verify phone number by SMS.
    pub fn phone_number_sms(
        phone_number: impl AsRef<str>,
    ) -> Result<StartVerify, phonenumber::ParseError> {
        Self::phone_number_channel(phone_number, PhoneNumberChannel::Sms)
    }

    /// Verify phone number by call.
    pub fn phone_number_call(
        phone_number: impl AsRef<str>,
    ) -> Result<StartVerify, phonenumber::ParseError> {
        Self::phone_number_channel(phone_number, PhoneNumberChannel::Call)
    }

    /// Verify phone number using the given channel.
    pub fn phone_number_channel(
        phone_number: impl AsRef<str>,
        channel: PhoneNumberChannel,
    ) -> Result<StartVerify, phonenumber::ParseError> {
        let phone_number = PhoneNumber::from_str(phone_number.as_ref())?;
        Ok(Self::PhoneNumber(phone_number, channel))
    }

    /// Get the API `channel` field for this request.
    pub fn api_channel(&self) -> String {
        match self {
            StartVerify::EmailAddress(_) => "email",
            StartVerify::PhoneNumber(_, PhoneNumberChannel::Sms) => "sms",
            StartVerify::PhoneNumber(_, PhoneNumberChannel::Call) => "call",
        }
        .to_string()
    }

    /// Get the API `to` field for this request.
    pub fn api_to(&self) -> String {
        match self {
            StartVerify::EmailAddress(address) => address.to_string(),
            StartVerify::PhoneNumber(number, _) => number.format().mode(E164).to_string(),
        }
    }
}

/// A request to check a code received by the given verification target.
///
/// For use with [`crate::client::VerifyClient::check_params`].
#[derive(Clone, Eq, PartialEq, Debug)]
pub struct CheckVerify {
    pub target: CheckVerifyTarget,
    pub code: String,
}

impl CheckVerify {
    /// Check by Verification SID.
    pub fn sid(sid: String, code: String) -> Self {
        Self {
            target: CheckVerifyTarget::Sid(sid),
            code,
        }
    }

    /// Check by free-form email address.
    pub fn email_address(email_address: String, code: String) -> Result<Self, String> {
        let email_address = parse_email_address(email_address)?;
        Ok(Self {
            target: CheckVerifyTarget::EmailAddress(email_address),
            code,
        })
    }

    /// Check by free-form phone number.
    pub fn phone_number(
        phone_number: impl AsRef<str>,
        code: String,
    ) -> Result<Self, phonenumber::ParseError> {
        let phone_number = PhoneNumber::from_str(phone_number.as_ref())?;
        Ok(Self {
            target: CheckVerifyTarget::PhoneNumber(phone_number),
            code,
        })
    }

    /// Add this target and code to the given base params.
    pub(crate) fn add_to_params(
        &self,
        params: CreateVerificationCheckParams,
    ) -> CreateVerificationCheckParams {
        api::CreateVerificationCheckParams {
            code: self.code.to_owned(),
            ..self.target.add_to_params(params)
        }
    }
}

/// The verification target to check a verification code for.
#[derive(Clone, Eq, PartialEq, Debug)]
pub enum CheckVerifyTarget {
    Sid(String),
    EmailAddress(EmailAddress),
    PhoneNumber(PhoneNumber),
}

impl CheckVerifyTarget {
    /// Add this target to the given base params.
    fn add_to_params(
        &self,
        params: CreateVerificationCheckParams,
    ) -> CreateVerificationCheckParams {
        match self {
            CheckVerifyTarget::Sid(sid) => api::CreateVerificationCheckParams {
                verification_sid: Some(sid.to_owned()),
                ..params
            },
            CheckVerifyTarget::EmailAddress(address) => api::CreateVerificationCheckParams {
                to: Some(address.to_string()),
                ..params
            },
            CheckVerifyTarget::PhoneNumber(number) => api::CreateVerificationCheckParams {
                to: Some(number.format().mode(E164).to_string()),
                ..params
            },
        }
    }
}

pub fn parse_email_address(email_address: impl AsRef<str>) -> Result<EmailAddress, String> {
    let email_address = email_address.as_ref();
    let email_address = EmailAddress::parse(email_address, None)
        .ok_or_else(|| format!("invalid email: {}", email_address))?;
    Ok(email_address)
}
