import { Component, OnInit } from '@angular/core';
import {
  faCreditCard,
  faDonate,
  faHandHoldingUsd,
  faQrcode,
  faReceipt,
  faWallet,
} from '@fortawesome/free-solid-svg-icons';
import { SessionQuery } from 'src/app/stores/session/session.query';

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
      url: 'https://testnet.algoexplorer.io/dispenser',
    },
    {
      title: 'Withdraw',
      icon: faHandHoldingUsd,
      disabled: true,
    },
    {
      title: 'Receive',
      icon: faQrcode,
      path: '/wallet/receive',
      disabled: true,
    },
    {
      title: 'My Transactions',
      icon: faReceipt,
      disabled: true,
    },
  ]; // Placeholder icons until we get definite ones.

  constructor(public sessionQuery: SessionQuery) {
    this.ownerName = sessionQuery.getValue().name;
  }

  ngOnInit() {}
}
