from common.settings import AppSettings


class MongoSettings(AppSettings):
    """
    MongoDB configuration settings.
    """

    wallet_db_connection_string: str | None
    wallet_db_name: str | None
    wallet_db_bookmark_collection: str | None
