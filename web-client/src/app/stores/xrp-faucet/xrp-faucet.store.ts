import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';

export interface XrpFaucetState {
  account: {
    xAddress: string | null;
    secret: string | null;
    classicAddress: string | null;
    address: string | null;
  };
  amount: number | null;
  balance: number | null;
}

export const createInitialState = (): XrpFaucetState => ({
  account: {
    xAddress: null,
    secret: null,
    classicAddress: null,
    address: null,
  },
  amount: null,
  balance: null,
});

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'xrp-faucet' })
export class XrpFaucetStore extends Store<XrpFaucetState> {
  constructor() {
    super(createInitialState());
  }
}
