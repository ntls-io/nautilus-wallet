from wallet_service.schema.actions import CreateWallet, CreateWalletResult
from wallet_service.schema.entites import WalletStorable
from data_service.schema.types import Engine
from user_auth_sgx import UserAuthEnclave
from xrpl_sgx import XrplEnclave

async def create_wallet(engine: Engine, params: CreateWallet)  -> CreateWalletResult:
    """
    Create a new wallet address given information sent by the client.
    1. Generate key pairs => generate sealed keypair (whicih generates wallet_address)
    2. Generate user's hash using password
    3. Sotre following details: seed, hash_string, walletAddress, owner_name, phone_number, security answers (posisbly hash string)  
    """

    "1. Get enclave to give sealed_xrpl_seed"
    instance = XrplEnclave()
    sealed_xrpl_seed = instance.generate_seed()
    wallet_id = instance.address(sealed_xrpl_seed)

    "2. Convert pin to pin_hash_string"
    pin_hash_string = UserAuthEnclave.hash_password(wallet_id,params.hash_pin)

    "3. Take questions, and convert ordinary hashes. Convert security answers to hash strings"


    new_wallet = WalletStorable(
        wallet_id=params.wallet_id, 
        owner_name = params.owner_name, 
        phone_number=params.phone_number,
        security_answers_hash=params.auth_map_hash,
        pin_hash_string =  pin_hash_string,
        sealed_xrpl_seed = sealed_xrpl_seed, 
    )
    await engine.save(new_wallet)
    return new_wallet