from pydantic import BaseModel
from typing import TypeAlias

from common.types import WalletAddress
from schema.entites import WalletDisplay


class CreateWallet(BaseModel):
    """
    Wallet creation parameters.
    """

    owner_name: str
    phone_number: str
    pin: str
    security_answer: dict[str,str]


class CreateWalletSuccess(BaseModel):
    """
    Return WalletId & other details upon successful wallet creation.
    """

    Opened: WalletDisplay

class CreateWalletFailed(BaseModel):
    """
    Return Failure if wallet is not created.
    """
    Failed: str

CreateWalletResult: TypeAlias = CreateWalletSuccess | CreateWalletFailed

class OpenWallet(BaseModel):
    """
    Open Wallet parameters.
    """
    wallet_id: WalletAddress
    auth_pin: str

class OpenWalletSuccess(BaseModel):
    """
    Successfull wallet Opened.
    """
    
    Opened: WalletDisplay

class OpenWalletFailure(BaseModel):
    """
    Failed wallet Opened.
    """
    
    Failed: str

class OpenWalletResult: TypeAlias = OpenWalletSuccess | OpenWalletFailure

class StartPinReset(BaseModel):
    """
    Parameters used to check user-input answers to security questions.
    """

    wallet_id: WalletAddress
    attempted_security_answer: dict[str,str]

class StartPinResetSuccess(BaseModel):
    """
    Successfully answered question.
    Consider sending a JWT?
    """
    
    Success: str

class StartPinResetFailure(BaseModel):
    """
    Failed to answer security questions correctly.
    """
    
    Failed: str

class StartPinResetResult: TypeAlias = StartPinResetSuccess | StartPinResetFailure