import { Component, OnInit } from '@angular/core';
import {
  faCreditCard,
  faDonate,
  faHandHoldingUsd,
  faQrcode,
  faReceipt,
  faWallet,
} from '@fortawesome/free-solid-svg-icons';
import { WalletQuery } from 'src/app/wallet.query';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.page.html',
  styleUrls: ['./wallet.page.scss'],
})
export class WalletPage implements OnInit {
  faWallet = faWallet;
  ownerName!: string;

  actionItems = [
    {
      title: 'Send Money',
      icon: faCreditCard,
      path: '/wallet/send-funds',
    },
    {
      title: 'Top Up Wallet',
      icon: faDonate,
    },
    {
      title: 'Withdraw',
      icon: faHandHoldingUsd,
    },
    {
      title: 'Receive',
      icon: faQrcode,
      path: '/wallet/receive',
    },
    {
      title: 'My Transactions',
      icon: faReceipt,
    },
  ]; // Placeholder icons until we get definite ones.

  constructor(public walletQuery: WalletQuery) {
    this.ownerName = walletQuery.getValue().name;
  }

  ngOnInit() {}
}
