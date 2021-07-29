import { Component, OnInit } from '@angular/core';
import {
  faCreditCard,
  faMoneyBill,
  faMoneyCheck,
  faQrcode,
  faReceipt,
  faWallet,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.page.html',
  styleUrls: ['./wallet.page.scss'],
})
export class WalletPage implements OnInit {
  faWallet = faWallet;

  actionItems = [
    {
      title: 'Send Money',
      icon: faCreditCard,
    },
    {
      title: 'Top Up Wallet',
      icon: faMoneyBill,
    },
    {
      title: 'Withdraw',
      icon: faMoneyCheck,
    },
    {
      title: 'Receive',
      icon: faQrcode,
    },
    {
      title: 'My Transactions',
      icon: faReceipt,
    },
  ];

  constructor() {}

  ngOnInit() {}
}
