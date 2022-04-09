import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { Observable } from 'rxjs';
import {
  AccountData,
  extractAlgorandAssetBalance,
} from 'src/app/services/algosdk.utils';
import { environment } from 'src/environments/environment';
import { SessionState, SessionStore } from './session.store';

@Injectable({
  providedIn: 'root',
})
export class SessionQuery extends Query<SessionState> {
  name: Observable<SessionState['name']> = this.select('name');
  walletId: Observable<SessionState['walletId']> = this.select('walletId');

  // XXX(Pi): Just use Algorand asset balance, for now.
  balance: Observable<SessionState['balance']> = this.select((state) =>
    state.algorandAccount ? assetBalanceForDisplay(state.algorandAccount) : null
  );

  constructor(protected store: SessionStore) {
    super(store);
  }
}

/**
 * Get the account's default asset balance, decimal-adjusted for display.
 */
const assetBalanceForDisplay = (
  algorandAccount: AccountData
): number | null => {
  const balance = extractAlgorandAssetBalance(
    algorandAccount,
    environment.defaultAlgorandAssetId
  );
  if (balance === null) {
    return null;
  }
  return balance / 10 ** environment.defaultAlgorandAssetDecimals;
};
