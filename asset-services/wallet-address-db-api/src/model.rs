use mongodb::bson::oid::ObjectId;
use serde::{Deserialize, Serialize};

use crate::types::WalletId;

/// WalletDocument Model to represent a document in the database collection.
#[derive(Serialize, Deserialize, Debug)]
pub(crate) struct WalletDocument {
    #[serde(rename = "_id", skip_serializing_if = "Option::is_none")]
    pub(crate) id: Option<ObjectId>,
    pub(crate) wallet_id: WalletId,
    pub(crate) owner_name: String,
    pub(crate) phone_number: String,
}
