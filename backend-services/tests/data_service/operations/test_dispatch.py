from unittest.mock import AsyncMock

import pytest
from motor import motor_asyncio
from pymongo.results import InsertOneResult
from pytest_mock import MockerFixture

from common.types import WalletAddress
from data_service.operations.dispatch import dispatch
from data_service.schema.actions import (
    Action,
    ActionMethod,
    CreateBookmark,
    CreateBookmarkResult,
)
from data_service.schema.entities import Bookmark
from tests.data_service.operations.helpers import mock_settings


@pytest.mark.asyncio
async def test_dispatch_success(mocker: MockerFixture) -> None:
    mock_insert_one = AsyncMock(return_value=InsertOneResult(None, acknowledged=True))
    mocker.patch("motor.motor_asyncio.AsyncIOMotorClient")
    mocker.patch.object(
        motor_asyncio.AsyncIOMotorCollection, "insert_one", new=mock_insert_one
    )
    mocker.patch("data_service.operations.bookmark.mongo_settings", mock_settings())
    params = CreateBookmark(
        wallet_id=WalletAddress("test_id"),
        bookmark=Bookmark(name="test_name", address=WalletAddress("test_address")),
    )
    request = Action(method=ActionMethod.CREATE_BOOKMARK, params=params)
    assert await dispatch(request) == CreateBookmarkResult(success=True)
    mock_insert_one.assert_awaited_once_with(params.dict())
