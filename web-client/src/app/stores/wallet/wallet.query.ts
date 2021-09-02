import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { WalletState, WalletStore } from './wallet.store';

@Injectable({ providedIn: 'root' })
export class WalletQuery extends Query<WalletState> {
  constructor(protected store: WalletStore) {
    super(store);
  }
}
