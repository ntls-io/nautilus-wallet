import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.page.html',
  styleUrls: ['./wallet.page.scss'],
})
export class WalletPage implements OnInit {
  actionItems = [
    {
      title: 'Send Money',
      icon: 'cash',
    },
    {
      title: 'Top Up Wallet',
      icon: 'cash',
    },
    {
      title: 'Withdraw',
      icon: 'archive',
    },
    {
      title: 'Receive',
      icon: 'qr-code',
    },
    {
      title: 'My Transactions',
      icon: 'receipt',
    },
  ];

  constructor() {}

  ngOnInit() {}
}
