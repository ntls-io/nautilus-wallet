from unittest.mock import AsyncMock

import pytest
from motor import motor_asyncio
from odmantic import AIOEngine, ObjectId
from pytest_mock import MockerFixture

from data_service.operations.invite import invite, redeem_invite
from data_service.schema.actions import RedeemInvite
from data_service.schema.entities import Invite

from .utils import patch_mongo_client


@pytest.mark.asyncio
async def test_get_invite_success(mocker: MockerFixture) -> None:
    patch_mongo_client(mocker)
    engine = AIOEngine(client=motor_asyncio.AsyncIOMotorClient())

    test_invite_code = "AAABBB"
    test_invite_id = "a" * 24
    stored_invite = {
        "id": ObjectId(test_invite_id),
        "code": test_invite_code,
        "redeemed": False,
    }
    test_invite = Invite.parse_obj(stored_invite)

    mock_find_one = AsyncMock(return_value=test_invite)
    mocker.patch.object(AIOEngine, "find_one", mock_find_one)

    assert await invite(engine, test_invite_code) == test_invite
    mock_find_one.assert_awaited_once_with(
        Invite,
        (Invite.code == test_invite_code) & (Invite.redeemed == False),  # noqa: E712
    )


@pytest.mark.asyncio
async def test_redeem_invite_success(mocker: MockerFixture) -> None:
    patch_mongo_client(mocker)
    engine = AIOEngine(client=motor_asyncio.AsyncIOMotorClient())

    test_invite_code = "AAABBB"
    test_invite_id = "a" * 24
    stored_invite = {
        "id": ObjectId(test_invite_id),
        "code": test_invite_code,
        "redeemed": False,
    }
    test_invite = Invite.parse_obj(stored_invite)

    mock_find_one = AsyncMock(return_value=test_invite)
    mock_save = AsyncMock(return_value=test_invite)
    mocker.patch.object(AIOEngine, "find_one", mock_find_one)
    mocker.patch.object(AIOEngine, "save", mock_save)

    assert await redeem_invite(engine, RedeemInvite(invite_id=test_invite_id)) is None
    mock_find_one.assert_awaited_once_with(
        Invite, Invite.id == ObjectId(test_invite_id)
    )
    mock_save.assert_awaited_once_with(test_invite)
