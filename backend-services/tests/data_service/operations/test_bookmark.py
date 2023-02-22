from unittest.mock import AsyncMock

import pytest
from motor import motor_asyncio
from odmantic import AIOEngine, ObjectId
from pytest_mock import MockerFixture

from common.types import WalletAddress
from data_service.operations.bookmark import bookmarks, create_bookmark, delete_bookmark
from data_service.schema.actions import CreateBookmark, DeleteBookmark
from data_service.schema.entities import Bookmark

from data_service.operations.autofund import autofund_wallet

@pytest.mark.asyncio
async def test_fund_wallet() -> None:
    wallet_id = WalletAddress("rGfxNFSJHx28gTmVt4UNow9K4VC1yVsXmH")
    tx_response = await autofund_wallet(wallet_id)
    assert tx_response.status == 'success'


@pytest.mark.asyncio
async def test_create_bookmark_success(mocker: MockerFixture) -> None:
    mocker.patch("motor.motor_asyncio.AsyncIOMotorClient")
    test_create_bookmark = CreateBookmark(
        wallet_id=WalletAddress("test_wallet_id"),
        name="test_name",
        address=WalletAddress("test_address"),
    )

    mock_save = AsyncMock(return_value=test_create_bookmark)
    mocker.patch.object(AIOEngine, "save", mock_save)
    engine = AIOEngine(client=motor_asyncio.AsyncIOMotorClient())

    returned_bookmark = await create_bookmark(engine, test_create_bookmark)
    mock_save.assert_awaited_once_with(returned_bookmark)


@pytest.mark.asyncio
async def test_delete_bookmark_success(mocker: MockerFixture) -> None:
    hex_string_id = "a" * 24
    bookmark_to_delete = Bookmark.parse_obj(
        {
            "id": ObjectId(hex_string_id),
            "wallet_id": "test_wallet_id",
            "name": "test_name1",
            "address": "test_address1",
        }
    )
    mocker.patch("motor.motor_asyncio.AsyncIOMotorClient")

    mock_find_one = AsyncMock(return_value=bookmark_to_delete)
    mock_delete = AsyncMock(return_value=None)
    mocker.patch.object(AIOEngine, "find_one", mock_find_one)
    mocker.patch.object(AIOEngine, "delete", mock_delete)

    engine = AIOEngine(client=motor_asyncio.AsyncIOMotorClient())

    params = DeleteBookmark(delete_id=hex_string_id)

    assert await delete_bookmark(engine, params) is None
    mock_find_one.assert_awaited_once_with(
        Bookmark, Bookmark.id == ObjectId(params.delete_id)
    )
    mock_delete.assert_awaited_once_with(bookmark_to_delete)


@pytest.mark.asyncio
async def test_get_bookmarks_success(mocker: MockerFixture) -> None:
    stored_docs = [
        {
            "id": ObjectId(b"a" * 12),
            "wallet_id": "test_wallet_id",
            "name": "test_name1",
            "address": "test_address1",
        },
        {
            "id": ObjectId(b"b" * 12),
            "wallet_id": "test_wallet_id",
            "name": "test_name2",
            "address": "test_address2",
        },
    ]
    mock_find = AsyncMock(return_value=stored_docs)
    mocker.patch("motor.motor_asyncio.AsyncIOMotorClient")
    mocker.patch.object(AIOEngine, "find", mock_find)
    engine = AIOEngine(client=motor_asyncio.AsyncIOMotorClient())

    wallet_id = WalletAddress("test_wallet_id")
    expected_bookmarks = [Bookmark.parse_obj(doc) for doc in stored_docs]
    assert await bookmarks(engine, wallet_id) == expected_bookmarks
    mock_find.assert_awaited_once_with(Bookmark, Bookmark.wallet_id == wallet_id)
