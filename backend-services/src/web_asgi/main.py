"""
Entry point for the Nautilus Wallet web server.
"""

from fastapi import FastAPI
from motor.motor_asyncio import AsyncIOMotorClient

from data_service.operations.bookmark import bookmarks, create_bookmark
from data_service.operations.bookmark import delete_bookmark as data_delete_bookmark
from data_service.schema.actions import (
    CreateBookmark,
    CreateBookmarkResult,
    DeleteBookmark,
    DeleteBookmarkResult,
    GetBookmarks,
    GetBookmarksResult,
)
from web_asgi.settings import AppSettings

app_settings = AppSettings()
mongo_client = AsyncIOMotorClient(app_settings.wallet_db_connection_string)
app = FastAPI()


@app.get("/bookmarks", response_model=GetBookmarksResult)
async def get_bookmarks(request: GetBookmarks) -> GetBookmarksResult:
    return await bookmarks(mongo_client, request)


@app.post("/bookmark/create", response_model=CreateBookmarkResult)
async def post_bookmark_create(request: CreateBookmark) -> CreateBookmarkResult:
    return await create_bookmark(mongo_client, request)


@app.delete("/bookmark", response_model=DeleteBookmarkResult)
async def delete_bookmark(request: DeleteBookmark) -> DeleteBookmarkResult:
    return await data_delete_bookmark(mongo_client, request)
