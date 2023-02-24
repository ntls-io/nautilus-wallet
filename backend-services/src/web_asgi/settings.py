from pydantic import HttpUrl, MongoDsn

from common.settings import Settings


class AppSettings(Settings):
    """
    Application configuration settings
    """

    primary_origin: HttpUrl
    staging_mode: bool = False
    
    wallet_db_name: str
    wallet_db_connection_string: MongoDsn
    
    autofund_account: str
    autofund_key: str
    autofund_server: HttpUrl
    autofund_sequence: int
    autofund_amount: int
