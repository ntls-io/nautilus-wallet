from wallet_service.schema.actions import OpenWallet, OpenWalletResult
from data_service.schema.types import Engine
from user_auth_sgx import UserAuthEnclave


async def open_wallet(engine: Engine, params: OpenWallet)  -> OpenWalletResult:
    """
    Open wallet address given information (wallet_id and auth_pin) sent by the client.
    1. Check client pin against stored pin.
    2. If the PINs match, send back WalletDisplay object to the client 
    (or if failed, client will recieve a Failed mesage.)
    verify_password(password,hash_string) -> boolean
    """