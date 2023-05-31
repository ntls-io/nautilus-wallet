use std::string::{String, ToString};

use super::store::UnlockWalletError;
use crate::schema::actions::{UpdateOtpPhoneNumber, UpdateOtpPhoneNumberResult};
use crate::wallet_operations::store::{mutate_wallet, unlock_wallet};

pub fn update_otp_phone_number(request: &UpdateOtpPhoneNumber) -> UpdateOtpPhoneNumberResult {
    match unlock_wallet(&request.wallet_id, &request.auth_pin) {
        Ok(_) => {
            return match mutate_wallet(&request.wallet_id, |mut stored| {
                stored.otp_phone_number = Some(request.new_phone_number.clone());
                stored
            }) {
                Ok(Some(_)) => UpdateOtpPhoneNumberResult::Updated,
                Ok(None) => UpdateOtpPhoneNumberResult::NotFound,
                Err(err) => UpdateOtpPhoneNumberResult::Failed(err.to_string()),
            }
        }
        Err(err) => match err {
            UnlockWalletError::InvalidAuthPin | UnlockWalletError::InvalidWalletId => {
                return UpdateOtpPhoneNumberResult::Failed(String::from(
                    "Authentication failed: invalid credentials",
                ))
            }
            UnlockWalletError::IoError(err) => UpdateOtpPhoneNumberResult::Failed(err.to_string()),
        },
    }
}
