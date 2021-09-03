import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';

export interface WalletState {
  walletId: string;
  name: string;
  pin: string;
  transactionId: string;
  balance: number | null;
}

export const createInitialState = (): WalletState => ({
  walletId: '',
  name: '',
  pin: '',
  transactionId: '',
  balance: null,
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
