from datetime import datetime

from bson import ObjectId
from fastapi import HTTPException

from common.types import WalletAddress
from data_service.schema.actions import (
    CreateRecurringPayment,
    DeleteRecurringPayment,
    UpdateLastPaidDate,
    UpdateRecurringPayment,
)
from data_service.schema.entities import RecurringPayment
from data_service.schema.types import Engine


async def recurring_payments(
    engine: Engine, wallet_id: WalletAddress
) -> list[RecurringPayment]:
    """
    Fetch a list of recurring payments for the given wallet.
    """
    return await engine.find(RecurringPayment, RecurringPayment.wallet_id == wallet_id)


async def create_recurring_payment(
    engine: Engine, params: CreateRecurringPayment
) -> None:
    """
    Create a new recurring payment.
    """
    new_recurring_payment = RecurringPayment(
        wallet_id=params.wallet_id,
        wallet_public_key=params.wallet_public_key,
        recipient=params.recipient,
        amount=params.amount,
        currency_code=params.currency_code,
        payment_start_date=params.payment_start_date,
        frequency=params.frequency,
        payment_end_date=params.payment_end_date,
        last_paid_date=-1,
    )
    await engine.save(new_recurring_payment)


async def update_recurring_payment(
    engine: Engine, params: UpdateRecurringPayment
) -> None:
    """
    Update the details of a recurring payment.
    """
    id_to_update = ObjectId(params.recurring_payment_id)
    recurring_payment = await engine.find_one(
        RecurringPayment, RecurringPayment.id == id_to_update
    )
    if recurring_payment is None:
        raise HTTPException(404)
    recurring_payment.wallet_id = params.wallet_id
    recurring_payment.wallet_public_key = params.wallet_public_key
    recurring_payment.recipient = params.recipient
    recurring_payment.amount = params.amount
    recurring_payment.currency_code = params.currency_code
    recurring_payment.payment_start_date = params.payment_start_date
    recurring_payment.frequency = params.frequency
    recurring_payment.payment_end_date = params.payment_end_date
    await engine.save(recurring_payment)


async def delete_recurring_payment(
    engine: Engine, params: DeleteRecurringPayment
) -> None:
    """
    Delete a specified recurring payment.
    """
    id_to_delete = ObjectId(params.recurring_payment_id)
    existing_recurring_payment = await engine.find_one(
        RecurringPayment, RecurringPayment.id == id_to_delete
    )
    if existing_recurring_payment is None:
        raise HTTPException(404)
    await engine.delete(existing_recurring_payment)


async def check_recurring_payments(engine: Engine) -> list[RecurringPayment]:
    """
    Retrieve a list of payments that need to happen today.
    """
    today = int(datetime.now().timestamp())
    payments = await engine.find(RecurringPayment)
    result_recurring_payments = []

    for payment in payments:
        if payment.payment_start_date <= today <= payment.payment_end_date and (
            payment.last_paid_date == -1
            or (today - payment.last_paid_date) // (24 * 60 * 60) >= payment.frequency
        ):
            result_recurring_payments.append(payment)

    return result_recurring_payments


async def update_last_paid_date(engine: Engine, params: UpdateLastPaidDate) -> None:
    """
    Update the last paid date of a recurring payment after a successful payment.
    """
    id_to_update = ObjectId(params.recurring_payment_id)
    recurring_payment = await engine.find_one(
        RecurringPayment, RecurringPayment.id == id_to_update
    )
    if recurring_payment is None:
        raise HTTPException(404)
    recurring_payment.last_paid_date = params.last_paid_date
    await engine.save(recurring_payment)
