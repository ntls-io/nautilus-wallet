from typing import TypeAlias

from pydantic import BaseModel, Field

from common.types import WalletAddress


class Bookmark(BaseModel):
    """
    An address on the ledger bookmarked by the user.
    """

    id_: str | None = Field(title="Internal database id")
    name: str
    address: WalletAddress


BookmarkList: TypeAlias = list[Bookmark]


class BookmarkDocument(BaseModel):
    """
    Database representation of a single bookmark.
    """

    wallet_id: WalletAddress
    bookmark: Bookmark
