from pydantic import BaseModel, validator

from common.types import WalletAddress
from data_service.schema.utils import valid_hex_representation


class CreateBookmark(BaseModel):
    """
    Bookmark creation parameters.
    """

    wallet_id: WalletAddress
    name: str
    address: WalletAddress


class DeleteBookmark(BaseModel):
    """
    Bookmark deletion parameters.
    """

    delete_id: str

    @validator("delete_id")
    @classmethod
    def valid_object_id_hex_representation(cls: type, v: str) -> str:
        return valid_hex_representation(cls, v)


class RedeemInvite(BaseModel):
    invite_id: str

    @validator("invite_id")
    @classmethod
    def valid_object_id_hex_representation(cls: type, v: str) -> str:
        return valid_hex_representation(cls, v)


