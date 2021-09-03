import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { WalletState, WalletStore } from './wallet.store';

@Injectable({
  providedIn: 'root',
})
export class WalletQuery extends Query<WalletState> {
  allState$ = this.select();
  selectName$ = this.select('name');
  selectWalletId$ = this.select('walletId');
  selectBalance$ = this.select('balance');

  constructor(protected store: WalletStore) {
    super(store);
  }
}
