import asyncio
from concurrent.futures import ThreadPoolExecutor

from fastapi import HTTPException
from twilio.rest import Client

from auth_service.schema.actions import (
    CheckOtpStatus,
    CheckOtpStatusResponse,
    SendOtp,
    SendOtpResponse,
)
from common.settings import AppSettings

executor = ThreadPoolExecutor()


def send_sms(client: Client, params: dict) -> str | None:
    # Perform Twilio API calls here
    verification = client.verify.v2.services(
        params["service_sid"]
    ).verifications.create(to=params["phone_number"], channel="sms")
    return verification.sid


def check_otp_verification(client: Client, params: dict) -> str | None:
    # Perform Twilio API calls here
    verification_check = client.verify.v2.services(
        params["service_sid"]
    ).verification_checks.create(
        verification_sid=params["verification_sid"], code=params["otp"]
    )
    return verification_check.status


async def send_otp_to_user(
    settings: AppSettings, client: Client, params: SendOtp
) -> SendOtpResponse:
    loop = asyncio.get_event_loop()
    send_sms_params = {
        "service_sid": settings.twilio_service_sid,
        "phone_number": params.phone_number,
    }
    verification_sid = await loop.run_in_executor(
        executor, send_sms, client, send_sms_params
    )
    if verification_sid is None:
        raise HTTPException(500)
    return SendOtpResponse(verification_sid=verification_sid)


async def check_otp_verification_status(
    settings: AppSettings, client: Client, params: CheckOtpStatus
) -> CheckOtpStatusResponse:
    loop = asyncio.get_event_loop()
    check_otp_params = {
        "service_sid": settings.twilio_service_sid,
        "verification_sid": params.verification_sid,
        "otp": params.otp,
    }
    status = await loop.run_in_executor(
        executor, check_otp_verification, client, check_otp_params
    )
    if status is None:
        raise HTTPException(500)
    return CheckOtpStatusResponse(status=status)
