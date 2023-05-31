use wallet_address_db_api::client::CosmosDBMongo;
use wallet_address_db_api::exports;

use crate::exports::celery_prelude::{TaskError, TaskResult};
use crate::task_records::callbacks::{save_failure, save_success};

pub type Bson = exports::Bson;

#[celery::task(
on_success = save_success,
on_failure = save_failure,
)]
pub async fn insert_wallet_address(
    wallet_id: String,
    owner_name: String,
    phone_number: String,
) -> TaskResult<Bson> {
    let client = init_cosmosdbmongo_client()?;

    client
        .create(wallet_id, owner_name, phone_number)
        .await
        .map_err(|err| TaskError::UnexpectedError(format!("CosmosDBMongo API call failed {}", err)))
}

#[celery::task(
on_success = save_success,
on_failure = save_failure,
)]
pub async fn find_wallet_address(
    owner_name: String,
    phone_number: String,
) -> TaskResult<Option<String>> {
    let client = init_cosmosdbmongo_client()?;

    client
        .find_one(owner_name, phone_number)
        .await
        .map_err(|err| TaskError::UnexpectedError(format!("CosmosDBMongo API call failed {}", err)))
}

pub(crate) fn init_cosmosdbmongo_client() -> TaskResult<CosmosDBMongo> {
    CosmosDBMongo::from_env().map_err(|env_var_err| {
        TaskError::UnexpectedError(format!("init_cosmosdbmongo_client failed: {}", env_var_err))
    })
}
