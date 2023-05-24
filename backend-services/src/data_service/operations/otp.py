from bson import ObjectId
from fastapi import HTTPException

from common.types import WalletAddress
from data_service.schema.actions import (
    CreateOtpRecipientTrigger,
    DeleteOtpLimitTrigger,
    DeleteOtpRecipientTrigger,
)
from data_service.schema.entities import OtpLimitTrigger, OtpRecipientTrigger
from data_service.schema.types import Engine


async def set_otp_limit_trigger(engine: Engine, params: OtpLimitTrigger) -> None:
    """
    Set a new limit for the triggering of OTPs using "upsert" semantics.
    """
    existing_trigger = await engine.find_one(
        OtpLimitTrigger,
        (OtpLimitTrigger.wallet_id == params.wallet_id)
        & (OtpLimitTrigger.currency_code == params.currency_code),
    )

    if existing_trigger:
        existing_trigger.limit = params.limit
        await engine.save(existing_trigger)
    else:
        await engine.save(params)


async def otp_limit_triggers(
    engine: Engine, wallet_id: WalletAddress
) -> list[OtpLimitTrigger]:
    """
    Fetch a list of OTP limit triggers for the given wallet.
    """
    return await engine.find(OtpLimitTrigger, OtpLimitTrigger.wallet_id == wallet_id)


async def delete_otp_limit_trigger(
    engine: Engine, params: DeleteOtpLimitTrigger
) -> None:
    """
    Delete a specified recipient trigger.
    """
    id_to_delete = ObjectId(params.trigger_id)
    existing_trigger = await engine.find_one(
        OtpLimitTrigger, OtpLimitTrigger.id == id_to_delete
    )
    if existing_trigger is None:
        raise HTTPException(404)
    await engine.delete(existing_trigger)


async def otp_recipient_triggers(
    engine: Engine, wallet_id: WalletAddress
) -> list[OtpRecipientTrigger]:
    """
    Fetch a list of OTP limit triggers for the given wallet.
    """
    return await engine.find(
        OtpRecipientTrigger, OtpRecipientTrigger.wallet_id == wallet_id
    )


async def create_otp_recipient_trigger(
    engine: Engine, params: CreateOtpRecipientTrigger
) -> None:
    """
    Create a new address for which OTPs should be triggered.
    """
    new_trigger = OtpRecipientTrigger(
        wallet_id=params.wallet_id, recipient=params.recipient
    )
    await engine.save(new_trigger)


async def delete_otp_recipient_trigger(
    engine: Engine, params: DeleteOtpRecipientTrigger
) -> None:
    """
    Delete a specified recipient trigger.
    """
    id_to_delete = ObjectId(params.trigger_id)
    existing_trigger = await engine.find_one(
        OtpRecipientTrigger, OtpRecipientTrigger.id == id_to_delete
    )
    if existing_trigger is None:
        raise HTTPException(404)
    await engine.delete(existing_trigger)
