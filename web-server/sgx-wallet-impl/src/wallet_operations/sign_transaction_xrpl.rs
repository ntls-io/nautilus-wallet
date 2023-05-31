use crate::schema::entities::XrplAccount;
use crate::schema::types::Bytes;

pub(crate) fn sign_xrpl(signing_account: &XrplAccount, transaction_bytes: &Bytes) -> Bytes {
    let signature = signing_account.to_private_key().sign(transaction_bytes);
    let signature_bytes = Bytes::from(signature.as_ref());
    signature_bytes
}
