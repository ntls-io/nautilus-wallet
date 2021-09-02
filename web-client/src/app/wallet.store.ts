import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';

export interface WalletState {
  walletId: string;
  name: string;
  pin: string;
  transactionId: string;
}

export const createInitialState = (): WalletState => ({
  walletId: '',
  name: '',
  pin: '',
  transactionId: '',
});

@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'session' })
export class WalletStore extends Store<WalletState> {
  constructor() {
    super(createInitialState());
  }
}
