import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';

export interface XrpFaucetState {
  account: {
    xAddress: string;
    secret: string;
    classicAddress: string;
    address: string;
  };
  amount: number;
  balance: number;
}

export const createInitialState = (): XrpFaucetState => ({
  account: {
    xAddress: '',
    secret: '',
    classicAddress: '',
    address: '',
  },
  amount: 0,
  balance: 0,
});

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'xrp-faucet' })
export class XrpFaucetStore extends Store<XrpFaucetState> {
  constructor() {
    super(createInitialState());
  }
}
