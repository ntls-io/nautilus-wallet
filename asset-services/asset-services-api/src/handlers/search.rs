//! Handlers for [`tasks::search`].

use std::sync::Arc;
use std::time::Duration;

use asset_services_celery::celery_box::CeleryBox;
use asset_services_celery::task_records::redis_impl::RedisTaskRecords;
use asset_services_celery::tasks;
use asset_services_celery::tasks::search::Bson;
use axum::{extract, Json};
use serde::Deserialize;

use crate::errors::AnyhowErrorResponse;

const DEFAULT_TIMEOUT: Duration = Duration::from_secs(15);

/// Request for [`insert_wallet_address`].
#[derive(Deserialize)]
pub(crate) struct InsertWalletAddress {
    wallet_id: String,
    owner_name: String,
    phone_number: String,
}

/// Request for [`find_wallet_address`].
#[derive(Deserialize)]
pub(crate) struct FindWalletAddress {
    owner_name: String,
    phone_number: String,
}

/// Inserts wallet address into MongoDB
///
/// See: [`tasks::search::insert_wallet_address`]
pub(crate) async fn insert_wallet_address(
    extract::Extension(celery): extract::Extension<Arc<CeleryBox>>,
    Json(InsertWalletAddress {
        wallet_id,
        owner_name,
        phone_number,
    }): Json<InsertWalletAddress>,
) -> Result<Json<Bson>, AnyhowErrorResponse> {
    // XXX: Connection per request.
    let mut task_records = RedisTaskRecords::from_env().await?;

    let wallet_document = task_records
        .execute_task(
            celery.as_ref(),
            tasks::search::insert_wallet_address::new(wallet_id, owner_name, phone_number),
            DEFAULT_TIMEOUT,
        )
        .await?;

    Ok(Json(wallet_document))
}

/// Finds a wallet address in MongoDB
///
/// See: [`tasks::search::find_wallet_address`]
pub(crate) async fn find_wallet_address(
    extract::Extension(celery): extract::Extension<Arc<CeleryBox>>,
    Json(FindWalletAddress {
        owner_name,
        phone_number,
    }): Json<FindWalletAddress>,
) -> Result<Json<Option<String>>, AnyhowErrorResponse> {
    // XXX: Connection per request.
    let mut task_records = RedisTaskRecords::from_env().await?;

    let wallet_address = task_records
        .execute_task(
            celery.as_ref(),
            tasks::search::find_wallet_address::new(owner_name, phone_number),
            DEFAULT_TIMEOUT,
        )
        .await?;

    Ok(Json(wallet_address))
}
