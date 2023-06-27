from typing import TypeAlias

from odmantic import Model
from pydantic import BaseModel

from common.types import WalletAddress


class Bookmark(Model):
    """
    An address on the ledger bookmarked by the user.
    """

    wallet_id: WalletAddress
    name: str
    address: WalletAddress


BookmarkList: TypeAlias = list[Bookmark]


class BookmarkDocument(BaseModel):
    """
    Database representation of a single bookmark.
    """

    wallet_id: WalletAddress
    bookmark: Bookmark


class Invite(Model):
    """
    A single-use invitation.
    """

    code: str
    redeemed: bool = False


class OtpLimitTrigger(Model):
    """
    Threshold amount for triggering 2FA.
    """

    wallet_id: WalletAddress
    currency_code: str
    limit: int


class OtpRecipientTrigger(Model):
    """
    Recipient address for which 2FA should always be triggered.
    """

    wallet_id: WalletAddress
    recipient: WalletAddress


class RecurringPayment(Model):
    """
    Recurring payment details setup by sender.
    """

    wallet_id: WalletAddress
    wallet_public_key: str
    recipient: WalletAddress
    amount: float
    currency_code: str
    payment_start_date: int
    frequency: int
    payment_end_date: int
    last_paid_date: int
