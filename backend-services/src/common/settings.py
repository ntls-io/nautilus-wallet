from pydantic import BaseSettings
from pydantic.env_settings import SettingsSourceCallable


class Settings(BaseSettings):
    """
    Application configuration settings.

    Values not passed as keyword arguments are read from the environment if
    available.  Environment variables override settings passed in.
    """

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
