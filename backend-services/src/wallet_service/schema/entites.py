from typing import TypeAlias
from common.types import HashString

from odmantic import Model
from pydantic import BaseModel

from common.types import WalletAddress

class WalletDisplay(BaseModel):
    """
    Return Wallet credentials whe wallet is created or opened.
    """

    wallet_id: WalletAddress
    owner_name: str
    phone_number: str

class WalletStorable(Model):
    """
    Sotre following Wallet details: seed, hash_string, walletAddress, 
    owner_name, phone_number, security answers (posisbly hash string)
    """
    
    wallet_id: WalletAddress
    owner_name: str;
    phone_number: str
    security_answers: dict[bytes,HashString];
    pin_hash_string: HashString;
    sealed_xrpl_seed: bytes;
   