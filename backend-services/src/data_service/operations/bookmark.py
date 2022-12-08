import logging

from motor.motor_asyncio import AsyncIOMotorClient, AsyncIOMotorCollection

from data_service.schema.actions import (
    CreateBookmark,
    CreateBookmarkResult,
    DeleteBookmark,
    DeleteBookmarkResult,
    GetBookmarks,
    GetBookmarksResult,
)
from data_service.schema.entities import Bookmark, BookmarkDocument
from data_service.schema.types import Client
from data_service.settings import MongoSettings

mongo_settings = MongoSettings()


def bookmark_collection(
    client: AsyncIOMotorClient, settings: MongoSettings
) -> AsyncIOMotorCollection:
    db = client[settings.wallet_db_name]
    return db[settings.wallet_db_bookmark_collection]


async def create_bookmark(
    client: Client, params: CreateBookmark
) -> CreateBookmarkResult:
    """
    Create a new bookmark.
    """
    collection = bookmark_collection(client, mongo_settings)
    new_bookmark = BookmarkDocument.parse_obj(params)

    if not (await collection.insert_one(new_bookmark.dict())).acknowledged:
        return CreateBookmarkResult(success=False)
    return CreateBookmarkResult(success=True)


async def delete_bookmark(
    client: Client, params: DeleteBookmark
) -> DeleteBookmarkResult:
    """
    Delete a specified bookmark.
    """
    collection = bookmark_collection(client, mongo_settings)
    bookmark_to_delete = BookmarkDocument.parse_obj(params)

    if not (await collection.delete_one(filter=bookmark_to_delete.dict())).acknowledged:
        return DeleteBookmarkResult(success=False)
    return DeleteBookmarkResult(success=True)


async def bookmarks(client: Client, params: GetBookmarks) -> GetBookmarksResult:
    """
    Retrieve a list of all bookmarks for a given user from the database.
    """
    collection = bookmark_collection(client, mongo_settings)
    cursor = collection.find(filter=params.dict())
    bookmark_list = []

    try:
        bookmark_list = [
            Bookmark.parse_obj(doc["bookmark"]) for doc in await cursor.to_list()
        ]
    # TODO(JP): more granular exception handling
    except Exception:  # noqa: BLE001
        logging.exception("Unexpected error encountered while fetching bookmarks")
        return GetBookmarksResult(bookmarks=None)
    return GetBookmarksResult(bookmarks=bookmark_list)
