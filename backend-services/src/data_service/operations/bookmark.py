from fastapi import HTTPException
from odmantic import ObjectId

from common.types import WalletAddress
from data_service.schema.actions import CreateBookmark, DeleteBookmark
from data_service.schema.entities import Bookmark, BookmarkList
from data_service.schema.types import Engine


async def create_bookmark(engine: Engine, params: CreateBookmark) -> Bookmark:
    """
    Create a new bookmark.
    """
    new_bookmark = Bookmark(
        wallet_id=params.wallet_id, name=params.name, address=params.address
    )
    await engine.save(new_bookmark)
    return new_bookmark


async def delete_bookmark(engine: Engine, params: DeleteBookmark) -> None:
    """
    Delete a specified bookmark.
    """
    # XXX: assumes `params.id` is a 24 character hex string
    id_to_delete = ObjectId(params.delete_id)
    existing_bookmark = await engine.find_one(Bookmark, Bookmark.id == id_to_delete)
    if existing_bookmark is None:
        raise HTTPException(404)
    await engine.delete(existing_bookmark)


async def bookmarks(engine: Engine, wallet_id: WalletAddress) -> BookmarkList:
    """
    Retrieve a list of all bookmarks for a given user from the database.
    """
    return await engine.find(Bookmark, Bookmark.wallet_id == wallet_id)
