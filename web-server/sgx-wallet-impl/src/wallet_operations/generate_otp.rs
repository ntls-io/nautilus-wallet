use alloc::string::{String, ToString};
use rand::{Rng, thread_rng};
use std::{io, string};
use crate::wallet_operations::store::{unlock_wallet,mutate_wallet};
use crate::schema::actions::{GenerateOtp, GenerateOtpResult};
use crate::schema::entities::WalletStorable;
use crate::schema::types::WalletId;

static OTP_DIGIT_LENGTH:usize = 6;

// Generate 1 Random number of length 6
// Convert the integer to string
// Store the string

pub fn generate_otp(request: &GenerateOtp) -> GenerateOtpResult{

    let rand_number: u32 = rand::thread_rng().gen_range(0,1_000_000);
    let number = rand_number.to_string();
    let otp = "0".repeat(OTP_DIGIT_LENGTH-number.len()) + &number;

    let store_otp = | mut stored:WalletStorable | {

        stored.otp = Some(otp);
        stored
    };
    GenerateOtpResult::Generated(mutate_wallet(&request.wallet_id, store_otp).unwrap().unwrap().otp.unwrap())
}