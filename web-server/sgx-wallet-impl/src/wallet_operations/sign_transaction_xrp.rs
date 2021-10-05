use crate::schema::entities::XrpAccount;
use crate::schema::types::Bytes;

pub(crate) fn sign_xrp(signing_account: &XrpAccount, transaction_bytes: &Bytes) -> Bytes {
    let signature = signing_account.to_private_key().sign(transaction_bytes);
    let signature_bytes = Bytes::from(signature.as_ref());
    signature_bytes
}
