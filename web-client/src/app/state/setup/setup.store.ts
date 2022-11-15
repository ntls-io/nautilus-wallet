import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';

export interface SetupState {
  code: string;
  tokenIssuer: string;
  xrpIssuer: string;
  ledger: string;
  name: string;
}

export const createInitialState = (): SetupState => ({
  code: '',
  tokenIssuer: '',
  xrpIssuer: '',
  ledger: '',
  name: '',
});

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'setup' })
export class SetupStore extends Store<SetupState> {
  constructor() {
    super(createInitialState());
  }
}
