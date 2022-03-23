import { Component, OnInit } from '@angular/core';
import { Account, AccountQuery } from 'src/app/stores/account';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {
  account: Account | undefined;

  constructor(private accountQuery: AccountQuery) {
    this.accountQuery
      .selectActive()
      .subscribe((account) => (this.account = account));
  }

  ngOnInit() {}
}
