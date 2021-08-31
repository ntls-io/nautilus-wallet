import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';

export interface SessionState {
  walletId: string;
  name: string;
}

export const createInitialState = (): SessionState => ({
  walletId: '',
  name: '',
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
