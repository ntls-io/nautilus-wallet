import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';

export interface WalletState {
  walletId: string;
  name: string;
}

export function createInitialState(): WalletState {
  return {
    walletId: '',
    name: '',
  };
}

@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'session' })
export class WalletStore extends Store<WalletState> {
  constructor() {
    super(createInitialState());
  }
}
