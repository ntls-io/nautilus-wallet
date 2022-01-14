import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { SessionState, SessionStore } from './session.store';

@Injectable({
  providedIn: 'root',
})
export class SessionQuery extends Query<SessionState> {
  name = this.select('name');
  walletId = this.select('walletId');
  balance = this.select('balance');

  constructor(protected store: SessionStore) {
    super(store);
  }
}
