import { Component, OnInit } from '@angular/core';
import { ID } from '@datorama/akita';
import { NavController } from '@ionic/angular';
import {
  Account,
  AccountQuery,
  AccountService,
  AccountStore,
} from 'src/app/stores/account';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.page.html',
  styleUrls: ['./accounts.page.scss'],
})
export class AccountsPage implements OnInit {
  accounts: Account[] = [
    {
      walletId: '0x1j97f8d6gf9fdfg',
      currency: 'Algorand',
      balance: 1000000,
      code: 'Algo',
      hasAssets: true,
      symbol: 'ALGO',
    },
    {
      walletId: '97df8g6r8fghubkbdsfgkbd7',
      currency: 'Ripple',
      balance: 1000000,
      code: 'XRP',
      hasAssets: false,
      symbol: 'XRP',
    },
  ];
  totalBalance: number | undefined;

  constructor(
    public accountService: AccountService,
    public accountQuery: AccountQuery,
    public accountStore: AccountStore,
    private navCtrl: NavController
  ) {
    this.accountQuery.selectAll().subscribe((accounts) => {
      this.totalBalance = accounts.reduce(
        (total, { balance }) => Number(total) + Number(balance),
        0
      );
    });
  }

  ngOnInit() {
    this.accountService.createAccounts();
  }

  selectAccount(walletId: ID) {
    this.accountStore.setActive(walletId);
    this.navCtrl.navigateForward('account');
  }
}
