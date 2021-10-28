import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { extractAlgorandAssetBalance } from 'src/app/services/algosdk.utils';
import { environment } from 'src/environments/environment';
import { SessionState, SessionStore } from './session.store';

@Injectable({
  providedIn: 'root',
})
export class SessionQuery extends Query<SessionState> {
  name = this.select('name');
  walletId = this.select('walletId');

  // XXX(Pi): Just use Algorand asset balance, for now.
  balance = this.select((state) =>
    state.algorandAccount
      ? extractAlgorandAssetBalance(
          state.algorandAccount,
          environment.defaultAlgorandAssetId
        )
      : undefined
  );

  constructor(protected store: SessionStore) {
    super(store);
  }
}
