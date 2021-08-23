/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { faLink, faQrcode } from '@fortawesome/free-solid-svg-icons';
import { SignTransaction } from '../../../schema/actions';
import { WalletService } from '../../wallet.service';

@Component({
  selector: 'app-send-funds',
  templateUrl: './send-funds.page.html',
  styleUrls: ['./send-funds.page.scss'],
})
export class SendFundsPage implements OnInit {
  actionItems = [
    {
      label: 'Quick pay',
      title: 'Scan a QR code',
      icon: faQrcode,
    },
    {
      label: 'Add New Friend',
      title: 'Share my wallet address',
      icon: faLink,
    },
  ];

  constructor(private walletService: WalletService) {}

  async ngOnInit() {
    const walletDetails = {
      auth_pin: '1234',
      wallet_id: '6FSGWKVHKI2Y3SZFJMKPLDT2QP6UOJ6FB5L4KDMCOVAGCTC566PLKCUVYQ',
    };

    const unsignedTransaction =
      await this.walletService.createUnsignedTransaction({
        amount: 1234,
        from: walletDetails.wallet_id,
        to: walletDetails.wallet_id,
      });
    console.log('SendFundsPage', 'preparing txn:', {
      txID: unsignedTransaction.txID(),
      rawTxID: unsignedTransaction.rawTxID(),
      unsignedTransaction,
    });

    const algorand_transaction_bytes = unsignedTransaction.bytesToSign();
    if (!(algorand_transaction_bytes instanceof Uint8Array)) {
      throw new TypeError(algorand_transaction_bytes);
    }
    const request: SignTransaction = {
      algorand_transaction_bytes,
      ...walletDetails,
    };
    console.log('SendFundsPage', 'prepared request:', {
      request,
    });

    const result = await this.walletService
      .signTransaction(request)
      .toPromise();

    if ('Signed' in result) {
      const {
        Signed: { signed_transaction_bytes },
      } = result;

      console.log('submitting transaction…');
      const { txId } = await this.walletService.submitSignedTransaction(
        signed_transaction_bytes
      );
      console.log('got:', { txId });
      // TODO: waitForConfirmation examples
    } else {
      console.error('XXX signTransaction failed:', result);
    }
  }
}
