import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AccountStore } from './account.store';

@Injectable({ providedIn: 'root' })
export class AccountService {
  constructor(private accountStore: AccountStore, private http: HttpClient) {}

  async createAccounts() {
    this.accountStore.setLoading(true);
    await this.http
      .get('https://6232485a6f4ffe00fb86341c.mockapi.io/account/create')
      .toPromise()
      .then((account: any) => {
        console.log(account);
        this.accountStore.add(account);
      })
      .finally(() => this.accountStore.setLoading(false));
  }
}
