import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';

export interface WalletState {
  key: string;
}

export function createInitialState(): WalletState {
  return {
    key: ''
  };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'wallet' })
export class WalletStore extends Store<WalletState> {

  constructor() {
    super(createInitialState());
  }

}
