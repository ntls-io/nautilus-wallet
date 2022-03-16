import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { AccountState, AccountStore } from './account.store';

@Injectable({ providedIn: 'root' })
export class AccountQuery extends QueryEntity<AccountState> {
  wallets = this.selectAll();

  constructor(protected store: AccountStore) {
    super(store);
  }
}
