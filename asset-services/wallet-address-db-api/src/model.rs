use crate::types::WalletId;
use mongodb::bson::oid::ObjectId;
use serde::{Deserialize, Serialize};

/// WalletDocument Model to represent a document in the database collection.
#[derive(Serialize, Deserialize, Debug)]
pub(crate) struct WalletDocument {
    #[serde(rename = "_id", skip_serializing_if = "Option::is_none")]
    id: Option<ObjectId>,
    wallet_id: WalletId,
    owner_name: String,
    phone_number: String,
}
