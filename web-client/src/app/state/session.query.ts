import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { combineLatest, distinctUntilChanged, map, Observable } from 'rxjs';
import { AssetAmount } from 'src/app/utils/assets/assets.common';
import { assetAmountXrp } from 'src/app/utils/assets/assets.xrp';
import { assetAmountXrplToken } from 'src/app/utils/assets/assets.xrp.token';
import { defined } from 'src/app/utils/errors/panic';
import { parseNumber } from 'src/app/utils/validators';
import { environment } from 'src/environments/environment';
import { ifDefined } from 'src/helpers/helpers';
import { OnfidoCheckResult } from 'src/schema/actions';
import { WalletDisplay } from 'src/schema/entities';
import { SessionState, SessionStore } from './session.store';

/**
 * Application code should use this interface to query the session store.
 */
@Injectable({ providedIn: 'root' })
export class SessionQuery extends Query<SessionState> {
  wallet: Observable<SessionState['wallet']> = this.select('wallet');
  pin: Observable<SessionState['pin']> = this.select('pin');

  xrplAccountRoot: Observable<SessionState['xrplAccountRoot']> =
    this.select('xrplAccountRoot');

  xrplTrustlines: Observable<SessionState['xrplTrustlines']> =
    this.select('xrplTrustlines');

  // Wallet field queries:

  walletId: Observable<WalletDisplay['wallet_id'] | undefined> = this.select(
    ({ wallet }) => wallet?.wallet_id
  );
  name: Observable<WalletDisplay['owner_name'] | undefined> = this.select(
    ({ wallet }) => wallet?.owner_name
  );

  xrplBalances: Observable<AssetAmount[] | undefined> = this.select(
    ({ xrplBalances }) =>
      ifDefined(xrplBalances, (balances) =>
        balances.map(({ value, currency, issuer }): AssetAmount => {
          const amount = defined(
            parseNumber(value),
            `SessionQuery.xrplBalances: bad number: ${value}`
          );
          return currency === 'XRP'
            ? assetAmountXrp(amount)
            : assetAmountXrplToken(amount, {
                currency,
                issuer: defined(
                  issuer,
                  `SessionQuery.xrplBalances: unexpected undefined issuer for XRPL token currency ${currency}`
                ),
              });
        })
      )
  );

  allBalances: Observable<AssetAmount[]> = combineLatest([
    this.xrplBalances,
  ]).pipe(
    map(([xrplBalances]: [AssetAmount[] | undefined]) => [
      ...(xrplBalances ?? []),
    ]),
    distinctUntilChanged()
  );

  showKYC = !['bhutan'].includes(environment.organization);

  onfidoCheck: Observable<SessionState['onfidoCheck']> =
    this.select('onfidoCheck');

  onfidoCheckIsClear: Observable<boolean> = this.onfidoCheck.pipe(
    map((onfidoCheck?: OnfidoCheckResult) => onfidoCheck?.result === 'clear')
  );

  constructor(protected store: SessionStore) {
    super(store);
  }

  // Non-observable accessors:

  getXrpBalanceInDrops(): number | undefined {
    return ifDefined(this.getValue().xrplAccountRoot?.Balance, parseNumber);
  }

  hasXrpBalance() {
    return 0 < (this.getXrpBalanceInDrops() ?? 0);
  }

  /**
   * Helper: True if the store contains an active user session.
   */
  isActiveSession() {
    const { wallet, pin } = this.getValue();
    return wallet !== undefined && pin !== undefined;
  }

  /**
   * Helper: Return the current session's wallet + PIN, assuming it's active.
   *
   * @throws {Error} if a session isn't active.
   */
  assumeActiveSession(): Required<Pick<SessionState, 'wallet' | 'pin'>> {
    const prefix = 'SessionAlgorandService.assumeSession: invalid state';
    const { wallet, pin } = this.getValue();
    return {
      wallet: defined(wallet, `${prefix}: wallet not defined`),
      pin: defined(pin, `${prefix}: pin not defined`),
    };
  }
}
