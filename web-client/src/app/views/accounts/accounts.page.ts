import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import {
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

  selectAccount(walletId: string) {
    this.accountStore.setActive(walletId);
    this.navCtrl.navigateForward('account');
  }
}
