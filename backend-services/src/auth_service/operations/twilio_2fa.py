import asyncio

from fastapi import HTTPException
from twilio.rest import Client

from auth_service.schema.actions import (
    CheckOtpStatus,
    CheckOtpStatusResponse,
    SendOtp,
    SendOtpResponse,
)
from common.settings import AppSettings


async def send_otp_to_user(
    settings: AppSettings, client: Client, params: SendOtp
) -> SendOtpResponse:
    loop = asyncio.get_event_loop()
    asyncio.set_event_loop(loop)  # Set the Twilio client's event loop as the default

    verification = await client.verify.v2.services(
        settings.twilio_service_sid
    ).verifications.create_async(to=params.phone_number, channel="sms")

    asyncio.set_event_loop(None)  # Reset the default event loop

    if verification.sid is None:
        raise HTTPException(500)
    return SendOtpResponse(verification_sid=verification.sid)


async def check_otp_verification_status(
    settings: AppSettings, client: Client, params: CheckOtpStatus
) -> CheckOtpStatusResponse:
    verification_check = await client.verify.v2.services(
        settings.twilio_service_sid
    ).verification_checks.create_async(
        verification_sid=params.verification_sid, code=params.otp
    )

    if verification_check.status is None:
        raise HTTPException(500)
    return CheckOtpStatusResponse(status=verification_check.status)
