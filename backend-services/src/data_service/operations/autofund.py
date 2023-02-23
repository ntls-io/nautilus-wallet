from xrpl.asyncio.transaction import (
    safe_sign_and_autofill_transaction,
    send_reliable_submission,
)
from xrpl.clients import JsonRpcClient
from xrpl.models.transactions import Payment
from xrpl.utils import xrp_to_drops
from xrpl.wallet import Wallet

from common.types import WalletAddress
from web_asgi.settings import AppSettings


async def autofund_wallet(wallet_id: WalletAddress) -> None:
    """
    Create and send a transaction to fund a newly created wallet
    """
    app_settings = AppSettings()
    client = JsonRpcClient(app_settings.autofund_server)

    sender_wallet = Wallet(app_settings.autofund_key, app_settings.autofund_sequence)
    sender_account = sender_wallet.classic_address

    my_tx_payment = Payment(
        account=sender_account,
        amount=xrp_to_drops(app_settings.autofund_amount),
        destination=wallet_id,
    )

    my_tx_payment_signed = await safe_sign_and_autofill_transaction(
        my_tx_payment, sender_wallet, client
    )
    return await send_reliable_submission(my_tx_payment_signed, client)
