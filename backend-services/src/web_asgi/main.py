"""
Entry point for the Nautilus Wallet web server.
"""

from fastapi import FastAPI, status
from fastapi.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
from odmantic import AIOEngine

from common.types import WalletAddress
from data_service.operations.autofund import autofund_wallet
from data_service.operations.bookmark import bookmarks, create_bookmark
from data_service.operations.bookmark import delete_bookmark as data_delete_bookmark
from data_service.operations.autofund import autofund_wallet

from data_service.schema.actions import CreateBookmark, DeleteBookmark
from data_service.schema.entities import Bookmark, BookmarkList
from web_asgi.settings import AppSettings


app_settings = AppSettings()
mongo_client = AsyncIOMotorClient(app_settings.wallet_db_connection_string)
mongo_engine = AIOEngine(
    client=mongo_client,
    database=app_settings.wallet_db_name,
)

origins = [str(app_settings.primary_origin)]
if app_settings.staging_mode:
    origins.append("http://localhost:4200")

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "HEAD", "DELETE"],
    allow_headers=["*"],
)


@app.get("/bookmarks", response_model=BookmarkList, status_code=status.HTTP_200_OK)
async def get_bookmarks(wallet_id: WalletAddress) -> BookmarkList:
    return await bookmarks(mongo_engine, wallet_id)


@app.post(
    "/bookmark/create", response_model=Bookmark, status_code=status.HTTP_201_CREATED
)
async def post_bookmark_create(request: CreateBookmark) -> Bookmark:
    return await create_bookmark(mongo_engine, request)


@app.delete(
    "/bookmark",
    response_model=None,
    status_code=status.HTTP_204_NO_CONTENT,
)
async def delete_bookmark(request: DeleteBookmark) -> None:
    await data_delete_bookmark(mongo_engine, request)


@app.post("/wallet/autofund", response_model=None, status_code=status.HTTP_200_OK)
async def post_autofund_wallet(wallet_id: WalletAddress) -> None:
    await autofund_wallet(wallet_id)
