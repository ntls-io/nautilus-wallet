from pydantic import BaseSettings, HttpUrl, MongoDsn
from pydantic.env_settings import SettingsSourceCallable


class AppSettings(BaseSettings):
    """
    Application configuration settings.

    Values not passed as keyword arguments are read from the environment if
    available.  Environment variables override settings passed in.
    """

    primary_origin: HttpUrl
    staging_mode: bool = False

    wallet_db_name: str
    wallet_db_connection_string: MongoDsn

    autofund_account: str
    autofund_key: str
    autofund_server: HttpUrl
    autofund_sequence: int
    autofund_amount: float

    twilio_account_sid: str
    twilio_auth_token: str
    twilio_service_sid: str

    class Config:
        allow_mutation = False
        env_file = ".env"

        @classmethod
        def customise_sources(
            cls: type,
            init_settings: SettingsSourceCallable,
            env_settings: SettingsSourceCallable,
            file_secret_settings: SettingsSourceCallable,
        ) -> tuple[SettingsSourceCallable, ...]:
            # Environment variables should take precedence:
            #
            # https://pydantic-docs.helpmanual.io/usage/settings/#changing-priority
            return env_settings, init_settings, file_secret_settings
