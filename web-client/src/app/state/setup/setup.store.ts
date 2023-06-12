import { Injectable } from '@angular/core';
import { AppInfo } from '@capacitor/app';
import { Store, StoreConfig } from '@datorama/akita';

export interface SetupState {
  tokenSymbol: string;
  tokenIssuer: string;
  xrpIssuer: string;
  ledger: string;
  logo: string | undefined;
  appInfo: AppInfo | undefined;
}

export const createInitialState = (): SetupState => ({
  tokenSymbol: '',
  tokenIssuer: '',
  xrpIssuer: '',
  ledger: '',
  logo: undefined,
  appInfo: undefined,
});

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'setup' })
export class SetupStore extends Store<SetupState> {
  constructor() {
    super(createInitialState());
  }
}
