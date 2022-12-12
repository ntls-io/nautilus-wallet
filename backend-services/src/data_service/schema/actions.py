from pydantic import BaseModel, validator

from common.types import WalletAddress


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
        int(v, 16)
        if len(v) != 24:
            raise AssertionError(
                f"expected a 24 character hexadecimal string but '{v}' has length {len(v)}"
            )
        return v
