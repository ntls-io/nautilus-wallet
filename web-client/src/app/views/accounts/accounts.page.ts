import { Component, OnInit } from '@angular/core';
import { AccountQuery, AccountService } from 'src/app/stores/account';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.page.html',
  styleUrls: ['./accounts.page.scss'],
})
export class AccountsPage implements OnInit {
  constructor(
    private accountService: AccountService,
    public accountQuery: AccountQuery
  ) {}

  ngOnInit() {
    this.accountService.createAccounts();
  }

  addAccounts() {}
}
