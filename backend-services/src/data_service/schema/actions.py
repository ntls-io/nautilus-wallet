from pydantic import BaseModel, validator

from common.types import WalletAddress
from data_service.schema.utils import valid_hex_representation


class CreateBookmark(BaseModel):
    """
    Bookmark creation parameters.
    """

    wallet_id: WalletAddress
    name: str
    address: WalletAddress


class DeleteBookmark(BaseModel):
    """
    Bookmark deletion parameters.
    """

    delete_id: str

    @validator("delete_id")
    @classmethod
    def valid_object_id_hex_representation(cls: type, v: str) -> str:
        return valid_hex_representation(cls, v)


class RedeemInvite(BaseModel):
    invite_id: str

    @validator("invite_id")
    @classmethod
    def valid_object_id_hex_representation(cls: type, v: str) -> str:
        return valid_hex_representation(cls, v)


class CreateOtpRecipientTrigger(BaseModel):
    """
    OTP limit creation parameters.
    """

    wallet_id: WalletAddress
    recipient: WalletAddress


class DeleteOtpLimitTrigger(BaseModel):
    """
    OTP limit deletion parameters.
    """

    trigger_id: str

    @validator("trigger_id")
    @classmethod
    def valid_object_id_hex_representation(cls: type, v: str) -> str:
        return valid_hex_representation(cls, v)


class DeleteOtpRecipientTrigger(BaseModel):
    """
    OTP limit deletion parameters.
    """

    trigger_id: str

    @validator("trigger_id")
    @classmethod
    def valid_object_id_hex_representation(cls: type, v: str) -> str:
        return valid_hex_representation(cls, v)


class CreateRecurringPayment(BaseModel):
    """
    Recurring payment creation parameters.
    """

    wallet_id: WalletAddress
    wallet_public_key: str
    recipient: WalletAddress
    amount: float
    currency_code: str
    payment_start_date: int
    frequency: int
    payment_end_date: int

    @validator("payment_start_date", "payment_end_date")
    @classmethod
    def valid_date(cls: type, v: int) -> int:
        if not isinstance(v, int) or v <= 0:
            raise ValueError("Date must be a positive integer.")

        return v


class DeleteRecurringPayment(BaseModel):
    """
    Recurring payment deletion parameters.
    """

    recurring_payment_id: str

    @validator("recurring_payment_id")
    @classmethod
    def valid_object_id_hex_representation(cls: type, v: str) -> str:
        return valid_hex_representation(cls, v)


class UpdateRecurringPayment(BaseModel):
    """
    Recurring payment update parameters.
    """

    recurring_payment_id: str
    wallet_id: WalletAddress
    wallet_public_key: str
    recipient: WalletAddress
    amount: float
    currency_code: str
    payment_start_date: int
    frequency: int
    payment_end_date: int

    @validator("payment_start_date", "payment_end_date")
    @classmethod
    def valid_date(cls: type, v: int) -> int:
        if not isinstance(v, int) or v <= 0:
            raise ValueError("Date must be a positive integer.")

        return v

    @validator("recurring_payment_id")
    @classmethod
    def valid_object_id_hex_representation(cls: type, v: str) -> str:
        return valid_hex_representation(cls, v)


class UpdateLastPaidDate(BaseModel):
    """
    Last paid date update parameters.
    """

    recurring_payment_id: str
    last_paid_date: int

    @validator("last_paid_date")
    @classmethod
    def valid_date(cls: type, v: int) -> int:
        if not isinstance(v, int) or v <= 0:
            raise ValueError("Date must be a positive integer.")

        return v
