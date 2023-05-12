from fastapi import HTTPException
from xrpl import XRPLException
from xrpl.asyncio.transaction import (
    safe_sign_and_autofill_transaction,
    send_reliable_submission,
)
from xrpl.clients import JsonRpcClient
from xrpl.models.transactions import Payment
from xrpl.utils import xrp_to_drops
from xrpl.wallet import Wallet

from common.types import WalletAddress
from common.settings import AppSettings


async def autofund_wallet(wallet_id: WalletAddress) -> None:
    """
    Create and send a transaction to fund a newly created wallet
    """

    app_settings = AppSettings()

    sender_wallet = Wallet(app_settings.autofund_key, app_settings.autofund_sequence)
    sender_account = sender_wallet.classic_address

    my_tx_payment = Payment(
        account=sender_account,
        amount=xrp_to_drops(app_settings.autofund_amount),
        destination=wallet_id,
    )

    try:
        client = JsonRpcClient(app_settings.autofund_server)
        my_tx_payment_signed = await safe_sign_and_autofill_transaction(
            my_tx_payment, sender_wallet, client
        )
        await send_reliable_submission(my_tx_payment_signed, client)
    # TODO: more granular exception handling
    except XRPLException as e:
        raise HTTPException(
            status_code=503, detail="XRPL Exception, {}".format(e)
        ) from None
    except Exception:  # noqa: BLE001
        raise HTTPException(
            status_code=503, detail="Autofund transactions temporarily unavailable."
        ) from None
