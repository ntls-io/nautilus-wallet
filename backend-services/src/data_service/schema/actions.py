from enum import Enum
from typing import TypeAlias

from pydantic import BaseModel, Field

from common.types import WalletAddress
from data_service.schema.entities import Bookmark, BookmarkList


class ActionMethod(str, Enum):
    """
    Names of the various available methods.
    """

    CREATE_BOOKMARK = "CreateBookmark"
    DELETE_BOOKMARK = "DeleteBookmark"
    GET_BOOKMARKS = "GetBookmarks"


class CreateBookmark(BaseModel):
    """
    Bookmark creation parameters.
    """

    wallet_id: WalletAddress
    bookmark: Bookmark


class CreateBookmarkResult(BaseModel):
    """
    Bookmark creation outcome.
    """

    success: bool


class DeleteBookmark(BaseModel):
    """
    Bookmark deletion parameters.
    """

    wallet_id: WalletAddress
    bookmark: Bookmark


class DeleteBookmarkResult(BaseModel):
    """
    Bookmark deletion result.
    """

    success: bool


class GetBookmarks(BaseModel):
    """
    Bookmark retrieval parameters.
    """

    wallet_id: WalletAddress


class GetBookmarksResult(BaseModel):
    """
    Contains a list of bookmarks when successful or `None` otherwise.
    """

    bookmarks: BookmarkList | None = Field(...)


Response: TypeAlias = CreateBookmarkResult | DeleteBookmarkResult | GetBookmarksResult
RequestParams: TypeAlias = CreateBookmark | DeleteBookmark | GetBookmarks


class Action(BaseModel):
    """
    Representation of a method call to the data service.
    """

    method: ActionMethod
    params: RequestParams
