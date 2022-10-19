use bson::{doc, Bson, Document};
use env_var_helpers::env_vars;
use mongodb::error::Error;
use mongodb::options::ClientOptions;
use mongodb::{Client, Collection};

use crate::model::WalletDocument;

pub struct CosmosDBMongo {
    connection_string: String,
    database_name: String,
    collection_name: String,
}

impl CosmosDBMongo {
    fn new(connection_string: String, database_name: String, collection_name: String) -> Self {
        Self {
            connection_string,
            database_name,
            collection_name,
        }
    }

    pub fn from_env() -> Result<CosmosDBMongo, env_vars::EnvVarError> {
        let connection_string = env_vars::var("WALLET_ADDRESS_DB_CONNECTION_STRING")?;
        let database_name = env_vars::var("WALLET_ADDRESS_DB_DATABASE_NAME")?;
        let collection_name = env_vars::var("WALLET_ADDRESS_DB_COLLECTION_NAME")?;
        Ok(Self::new(connection_string, database_name, collection_name))
    }

    /// Creates a new document in the collection.
    /// Returns document id (ObjectId) if successfully inserted.
    pub async fn create(
        &self,
        wallet_id: String,
        owner_name: String,
        phone_number: String,
    ) -> Result<Bson, Error> {
        let client = MongoClient::connect(&self.connection_string).await?;

        let collection: Collection<Document> = client
            .client
            .database(&self.database_name)
            .collection(&self.collection_name);

        let wallet_document = WalletDocument {
            id: None,
            wallet_id,
            owner_name,
            phone_number,
        };

        let serialized_wallet_document = bson::to_bson(&wallet_document)?;
        let document = serialized_wallet_document.as_document().unwrap();

        match collection.insert_one(document, None).await {
            Ok(result) => Ok(result.inserted_id),
            Err(e) => Err(e),
        }
    }

    /// Finds wallet document from the collection.
    /// Returns the wallet id if exists, else returns `None`.
    pub async fn find_one(
        &self,
        owner_name: String,
        phone_number: String,
    ) -> Result<Option<String>, Error> {
        let client = MongoClient::connect(&self.connection_string).await?;

        let collection: Collection<Document> = client
            .client
            .database(&self.database_name)
            .collection(&self.collection_name);

        let doc_filter = doc! {"owner_name": owner_name, "phone_number": phone_number};
        match collection.find_one(Some(doc_filter), None).await {
            Ok(result) => match result {
                None => Ok(None),
                Some(document) => {
                    let wallet_document: WalletDocument =
                        bson::from_bson(Bson::Document(document))?;
                    Ok(Some(wallet_document.wallet_id))
                }
            },
            Err(e) => Err(e),
        }
    }
}

pub struct MongoClient {
    client: Client,
}

impl MongoClient {
    /// Establishes a connection to the mongo server with the given connection string.
    pub async fn connect(connection_string: &str) -> Result<Self, Error> {
        // parses the connection string and extract host information, token, tls configuration etc.
        let options = ClientOptions::parse(connection_string).await?;
        // Initialize a connection to Cosmos DB's mongo server
        let client = Client::with_options(options)?;

        Ok(Self { client })
    }
}
