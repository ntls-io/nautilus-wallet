import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { Observable } from 'rxjs';
import {
  Algos,
  convertToAlgos,
  MicroAlgos,
} from 'src/app/services/algosdk.utils';
import { defined } from 'src/app/utils/errors/panic';
import { ifDefined } from 'src/helpers/helpers';
import { WalletDisplay } from 'src/schema/entities';
import { SessionState, SessionStore } from './session.store';

/**
 * Application code should use this interface to query the session store.
 */
@Injectable({ providedIn: 'root' })
export class SessionQuery extends Query<SessionState> {
  wallet: Observable<SessionState['wallet']> = this.select('wallet');
  pin: Observable<SessionState['pin']> = this.select('pin');
  algorandAccountData: Observable<SessionState['algorandAccountData']> =
    this.select('algorandAccountData');

  // Wallet field queries:

  walletId: Observable<WalletDisplay['wallet_id'] | undefined> = this.select(
    ({ wallet }) => wallet?.wallet_id
  );
  name: Observable<WalletDisplay['owner_name'] | undefined> = this.select(
    ({ wallet }) => wallet?.owner_name
  );
  algorandAddressBase32: Observable<
    WalletDisplay['algorand_address_base32'] | undefined
  > = this.select(({ wallet }) => wallet?.algorand_address_base32);

  // Algorand account field queries:

  algorandBalanceInMicroAlgos = this.select(
    ({ algorandAccountData }) => algorandAccountData?.amount
  );

  algorandBalanceInAlgos: Observable<Algos | undefined> = this.select(
    ({ algorandAccountData }) =>
      ifDefined(algorandAccountData?.amount, convertToAlgos)
  );

  constructor(protected store: SessionStore) {
    super(store);
  }

  // Non-observable accessors:

  getAlgorandBalanceInMicroAlgos(): MicroAlgos | undefined {
    return this.getValue().algorandAccountData?.amount;
  }

  getAlgorandBalanceInAlgos(): Algos | undefined {
    return ifDefined(
      this.getValue().algorandAccountData?.amount,
      convertToAlgos
    );
  }

  hasAlgorandBalance() {
    return 0 < (this.getAlgorandBalanceInMicroAlgos() ?? 0);
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
