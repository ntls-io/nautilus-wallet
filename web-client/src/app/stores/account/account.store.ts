import { Injectable } from '@angular/core';
import {
  ActiveState,
  EntityState,
  EntityStore,
  StoreConfig,
} from '@datorama/akita';
import { Account } from './account.model';

export interface AccountState extends EntityState<Account>, ActiveState {}

@Injectable({ providedIn: 'root' })
@StoreConfig({
  name: 'account',
  idKey: 'walletId',
})
export class AccountStore extends EntityStore<AccountState> {
  constructor() {
    super();
  }
}
