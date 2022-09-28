use bson::{Bson, Document};
use env_var_helpers::env_vars;
use mongodb::{error::Error, options::ClientOptions, Client};

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
        let connection_string = env_vars::var("WALLET_ADDRESS_DB_DATABASE_NAME")?;
        let database_name = env_vars::var("WALLET_ADDRESS_DB_DATABASE_NAME")?;
        let collection_name = env_vars::var("WALLET_ADDRESS_DB_COLLECTION_NAME")?;
        Ok(Self::new(connection_string, database_name, collection_name))
    }

    /// Creates a new document in the collection.
    /// Returns document id (ObjectId) if successfully inserted.
    pub async fn create(&self, doc: Document) -> Result<Bson, Error> {
        let client = MongoClient::connect(&self.connection_string).await?;

        let collection = client
            .client
            .database(&self.database_name)
            .collection(&self.collection_name);

        match collection.insert_one(doc, None).await {
            Ok(result) => Ok(result.inserted_id),
            Err(e) => Err(e),
        }
    }

    /// Reads a document from the collection.
    /// Returns the document if it exists, else returns `None`.
    pub async fn read(&self, doc: Document) -> Result<Option<Document>, Error> {
        let client = MongoClient::connect(&self.connection_string).await?;

        let collection = client
            .client
            .database(&self.database_name)
            .collection(&self.collection_name);

        collection.find_one(Some(doc), None).await
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
