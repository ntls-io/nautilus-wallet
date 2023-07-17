"""
Entry point for the Nautilus Wallet web server.
"""

from fastapi import FastAPI, status
from fastapi.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
from odmantic import AIOEngine
from twilio.rest import Client as TwilioClient

from auth_service.schema.actions import (
    CheckOtpStatus,
    CheckOtpStatusResponse,
    SendOtp,
    SendOtpResponse,
)
from common.settings import AppSettings
from common.types import WalletAddress
from data_service.operations.autofund import autofund_wallet
from data_service.operations.bookmark import bookmarks, create_bookmark
from data_service.operations.bookmark import delete_bookmark as data_delete_bookmark
from data_service.operations.invite import invite, redeem_invite
from data_service.operations.otp import create_otp_recipient_trigger
from data_service.operations.otp import (
    delete_otp_limit_trigger as data_delete_otp_limit_trigger,
)
from data_service.operations.otp import (
    delete_otp_recipient_trigger as data_delete_otp_recipient_trigger,
)
from data_service.operations.otp import (
    otp_limit_triggers,
    otp_recipient_triggers,
    set_otp_limit_trigger,
)
from data_service.operations.recurringpayment import (
    check_recurring_payments,
    create_recurring_payment,
)
from data_service.operations.recurringpayment import (
    delete_recurring_payment as data_delete_recurring_payment,
)
from data_service.operations.recurringpayment import recurring_payments
from data_service.operations.recurringpayment import (
    update_last_paid_date as update_payment,
)
from data_service.operations.recurringpayment import (
    update_recurring_payment as update_existing_recurring_payment,
)
from data_service.schema.actions import (
    CreateBookmark,
    CreateOtpRecipientTrigger,
    CreateRecurringPayment,
    DeleteBookmark,
    DeleteOtpLimitTrigger,
    DeleteOtpRecipientTrigger,
    DeleteRecurringPayment,
    RedeemInvite,
    UpdateLastPaidDate,
    UpdateRecurringPayment,
)
from data_service.schema.entities import (
    Bookmark,
    BookmarkList,
    Invite,
    OtpLimitTrigger,
    OtpRecipientTrigger,
    RecurringPayment,
)
from src.auth_service.operations.twilio_2fa import (
    check_otp_verification_status,
    send_otp_to_user,
)

app_settings = AppSettings()
mongo_client = AsyncIOMotorClient(app_settings.wallet_db_connection_string)
mongo_engine = AIOEngine(
    client=mongo_client,
    database=app_settings.wallet_db_name,
)

twilio_client = TwilioClient(
    app_settings.twilio_account_sid,
    app_settings.twilio_auth_token,
)

origins = [str(app_settings.primary_origin)]
if app_settings.staging_mode:
    origins.append("http://localhost:4200")

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "HEAD", "DELETE"],
    allow_headers=["*"],
)


@app.get("/bookmarks", response_model=BookmarkList, status_code=status.HTTP_200_OK)
async def get_bookmarks(wallet_id: WalletAddress) -> BookmarkList:
    return await bookmarks(mongo_engine, wallet_id)


@app.get("/invite", response_model=Invite, status_code=status.HTTP_200_OK)
async def get_invite(invite_code: str) -> Invite:
    return await invite(mongo_engine, invite_code)


@app.get(
    "/otp/limit/triggers",
    response_model=list[OtpLimitTrigger],
    status_code=status.HTTP_200_OK,
)
async def get_otp_limit_triggers(wallet_id: WalletAddress) -> list[OtpLimitTrigger]:
    return await otp_limit_triggers(mongo_engine, wallet_id)


@app.get(
    "/otp/recipient/triggers",
    response_model=list[OtpRecipientTrigger],
    status_code=status.HTTP_200_OK,
)
async def get_otp_recipient_triggers(
    wallet_id: WalletAddress,
) -> list[OtpRecipientTrigger]:
    return await otp_recipient_triggers(mongo_engine, wallet_id)


@app.post("/invite/redeem", response_model=None, status_code=status.HTTP_200_OK)
async def post_invite_redeem(request: RedeemInvite) -> None:
    return await redeem_invite(mongo_engine, request)


@app.post(
    "/bookmark/create", response_model=Bookmark, status_code=status.HTTP_201_CREATED
)
async def post_bookmark_create(request: CreateBookmark) -> Bookmark:
    return await create_bookmark(mongo_engine, request)


@app.put("/otp/limit/set", response_model=None, status_code=status.HTTP_200_OK)
async def put_set_otp_limit_trigger(request: OtpLimitTrigger) -> None:
    await set_otp_limit_trigger(mongo_engine, request)


@app.post(
    "/otp/recipient/trigger",
    response_model=None,
    status_code=status.HTTP_201_CREATED,
)
async def post_create_otp_recipient_trigger(request: CreateOtpRecipientTrigger) -> None:
    await create_otp_recipient_trigger(mongo_engine, request)


@app.post(
    "/otp/send-to-user", response_model=SendOtpResponse, status_code=status.HTTP_200_OK
)
async def post_send_otp_to_user(request: SendOtp) -> SendOtpResponse:
    return await send_otp_to_user(
        client=twilio_client, settings=app_settings, params=request
    )


@app.post(
    "/otp/check-status",
    response_model=CheckOtpStatusResponse,
    status_code=status.HTTP_200_OK,
)
async def post_check_otp_status(request: CheckOtpStatus) -> CheckOtpStatusResponse:
    return await check_otp_verification_status(
        client=twilio_client, settings=app_settings, params=request
    )


@app.delete(
    "/bookmark",
    response_model=None,
    status_code=status.HTTP_204_NO_CONTENT,
)
async def delete_bookmark(request: DeleteBookmark) -> None:
    await data_delete_bookmark(mongo_engine, request)


@app.delete(
    "/otp/limit/trigger",
    response_model=None,
    status_code=status.HTTP_204_NO_CONTENT,
)
async def delete_otp_limit_trigger(request: DeleteOtpLimitTrigger) -> None:
    await data_delete_otp_limit_trigger(mongo_engine, request)


@app.delete(
    "/otp/recipient/trigger",
    response_model=None,
    status_code=status.HTTP_204_NO_CONTENT,
)
async def delete_otp_recipient_trigger(request: DeleteOtpRecipientTrigger) -> None:
    await data_delete_otp_recipient_trigger(mongo_engine, request)


@app.post("/wallet/autofund", response_model=None, status_code=status.HTTP_200_OK)
async def post_autofund_wallet(wallet_id: WalletAddress) -> None:
    await autofund_wallet(wallet_id)


@app.get(
    "/recurring/payments",
    response_model=list[RecurringPayment],
    status_code=status.HTTP_200_OK,
)
async def get_recurring_payments(
    wallet_id: WalletAddress,
) -> list[RecurringPayment]:
    return await recurring_payments(mongo_engine, wallet_id)


@app.post(
    "/recurring/payment",
    response_model=None,
    status_code=status.HTTP_201_CREATED,
)
async def post_create_recurring_payment(request: CreateRecurringPayment) -> None:
    await create_recurring_payment(mongo_engine, request)


@app.delete(
    "/recurring/payment",
    response_model=None,
    status_code=status.HTTP_204_NO_CONTENT,
)
async def delete_recurring_payment(request: DeleteRecurringPayment) -> None:
    await data_delete_recurring_payment(mongo_engine, request)


@app.get(
    "/recurring/payments/today",
    response_model=list[RecurringPayment],
    status_code=status.HTTP_200_OK,
)
async def get_recurring_payments_today() -> list[RecurringPayment]:
    """
    Retrieve a list of recurring payments that need to happen today.
    """
    return await check_recurring_payments(mongo_engine)


@app.put(
    "/recurring/payment/update-last-paid-date",
    response_model=None,
    status_code=status.HTTP_200_OK,
)
async def update_last_paid_date(request: UpdateLastPaidDate) -> None:
    """
    Update the last paid date for a recurring payment after a successful payment.
    """
    await update_payment(mongo_engine, request)


@app.put(
    "/recurring/payment/update",
    response_model=None,
    status_code=status.HTTP_200_OK,
)
async def update_recurring_payment(request: UpdateRecurringPayment) -> None:
    """
    Update the details of a recurring payment.
    """
    await update_existing_recurring_payment(mongo_engine, request)
