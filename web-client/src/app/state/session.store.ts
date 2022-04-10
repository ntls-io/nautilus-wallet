import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';

export interface SessionState {
  key: string;
}

export const createInitialState = (): SessionState => ({
  key: '',
});

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'session' })
export class SessionStore extends Store<SessionState> {
  constructor() {
    super(createInitialState());
  }
}
