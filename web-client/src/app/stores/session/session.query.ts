import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { SessionState, SessionStore } from './session.store';

@Injectable({
  providedIn: 'root',
})
export class SessionQuery extends Query<SessionState> {
  allState$ = this.select();
  selectName$ = this.select('name');
  selectWalletId$ = this.select('walletId');

  constructor(protected store: SessionStore) {
    super(store);
  }
}
