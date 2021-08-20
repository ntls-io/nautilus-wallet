import { Component, OnInit } from '@angular/core';
import { faLink, faQrcode } from '@fortawesome/free-solid-svg-icons';
import { ScannerService } from 'src/app/services/scanner.service';
import { WalletService } from 'src/app/wallet.service';
import { WalletDisplay } from 'src/schema/entities';

@Component({
  selector: 'app-send-funds',
  templateUrl: './send-funds.page.html',
  styleUrls: ['./send-funds.page.scss'],
})
export class SendFundsPage implements OnInit {
  amount: number = 0;

  actionItems = [
    {
      label: 'Quick pay',
      title: 'Scan a QR code',
      icon: faQrcode,
      action: 'presentScanner',
    },
    {
      label: 'Add New Friend',
      title: 'Share my wallet address',
      icon: faLink,
      disabled: true,
    },
  ];

  constructor(
    private scannerService: ScannerService,

    private walletService: WalletService
  ) {}

  ngOnInit() {}

  async presentScanner() {
    let rec = await this.scannerService.presentWithoutLock();
    let { sender, pin } = this.walletService.getValue();
    console.log(rec);
    console.log(sender);

    // this.walletService.signTransaction({
    //   // algorand_transaction_bytes: '',
    //   auth_pin: pin as string,
    //   wallet_id: (sender as { Opened: WalletDisplay }).Opened.wallet_id,
    // });
  }

  execItemAction(action: string | undefined) {
    switch (action) {
      case 'presentScanner':
        this.presentScanner();
        break;

      default:
        break;
    }
  }
}
function Input() {
  throw new Error('Function not implemented.');
}
