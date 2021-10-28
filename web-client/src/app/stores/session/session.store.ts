import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';
import { AccountData } from 'src/app/services/algosdk.utils';

export interface SessionState {
  walletId: string;
  name: string;
  pin: string;
  transactionId: string;
  balance: number | null;
  algorandAccount?: AccountData;
}

export const createInitialState = (): SessionState => ({
  walletId: '',
  name: '',
  pin: '',
  transactionId: '',
  balance: null,
});

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'session' })
export class SessionStore extends Store<SessionState> {
  constructor() {
    super(createInitialState());
  }
}
