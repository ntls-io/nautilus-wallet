from fastapi import HTTPException

from data_service.schema.actions import RedeemInvite
from data_service.schema.entities import Invite
from data_service.schema.types import Engine
from odmantic import ObjectId


async def invite(engine: Engine, invite_code: str) -> Invite:
    """
    Retrieve an unredeemed invite from the database, if available.
    """
    existing_invite = await engine.find_one(
        Invite, (Invite.code == invite_code) & (Invite.redeemed == False)  # noqa: E712
    )
    if existing_invite is None:
        raise HTTPException(404)
    return existing_invite


async def redeem_invite(engine: Engine, params: RedeemInvite) -> None:
    """
    Redeem an unredeemed invite, if one exists.
    """
    existing_invite = await engine.find_one(Invite, Invite.id == params.invite_id)
    if existing_invite is None:
        raise HTTPException(404)
    existing_invite.redeemed = True
    await engine.save(existing_invite)
