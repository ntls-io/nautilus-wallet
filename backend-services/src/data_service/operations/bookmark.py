import logging

from motor.motor_asyncio import AsyncIOMotorClient, AsyncIOMotorCollection

from common.types import WalletAddress
from data_service.schema.actions import (
    CreateBookmark,
    CreateBookmarkResult,
    DeleteBookmark,
    DeleteBookmarkResult,
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

    if not (await collection.delete_one(filter={"_id": params.id_})).acknowledged:
        return DeleteBookmarkResult(success=False)
    return DeleteBookmarkResult(success=True)


async def bookmarks(client: Client, wallet_id: WalletAddress) -> GetBookmarksResult:
    """
    Retrieve a list of all bookmarks for a given user from the database.
    """
    collection = bookmark_collection(client, mongo_settings)
    cursor = collection.find(filter={"wallet_id": wallet_id})
    bookmark_list = []

    try:
        bookmark_list = [
            Bookmark.parse_obj(
                {
                    "id_": doc["_id"],
                    "name": doc["bookmark"]["name"],
                    "address": doc["bookmark"]["address"],
                }
            )
            for doc in await cursor.to_list(mongo_settings.max_bookmark_list_length)
        ]
    # TODO(JP): more granular exception handling
    except Exception:  # noqa: BLE001
        logging.exception("Unexpected error encountered while fetching bookmarks")
        return GetBookmarksResult(bookmarks=None)
    return GetBookmarksResult(bookmarks=bookmark_list)
