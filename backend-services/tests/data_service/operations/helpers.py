from data_service.settings import MongoSettings

mock_settings = MongoSettings(
    max_bookmark_list_length=1024,
    wallet_db_name="wallet",
    wallet_db_bookmark_collection="bookmark",
)
