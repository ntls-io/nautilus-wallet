from data_service.settings import MongoSettings


def mock_settings() -> MongoSettings:
    return MongoSettings(
        wallet_db_connection_string="mongodb://localhost:27017",
        wallet_db_name="wallet",
        wallet_db_bookmark_collection="bookmark",
    )
