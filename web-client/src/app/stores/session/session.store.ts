import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';

export interface SessionState {
  walletId: string;
  name: string;
  pin: string;
  transactionId: string;
}

export const createInitialState = (): SessionState => ({
  walletId: '',
  name: '',
  pin: '',
  transactionId: '',
});

@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'session' })
export class SessionStore extends Store<SessionState> {
  constructor() {
    super(createInitialState());
  }
}
