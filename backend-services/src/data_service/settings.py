from common.settings import Settings


class MongoSettings(Settings):
    """
    MongoDB configuration settings.
    """

    max_bookmark_list_length: int | None
    wallet_db_name: str | None
    wallet_db_bookmark_collection: str | None
