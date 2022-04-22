import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';
import { AccountData, AssetParams } from 'src/app/services/algosdk.utils';
import { WalletDisplay } from 'src/schema/entities';

/**
 * State stored for a user session.
 *
 * This state should represent the domain data types faithfully where possible,
 * without unnecessary restructuring.
 */
export interface SessionState {
  /**
   * The current session's wallet details, as loaded from the wallet enclave.
   *
   * @see SessionService
   */
  wallet?: WalletDisplay;

  /**
   * The current session's user-supplied authentication PIN.
   */
  pin?: string;

  /**
   * The current session's Algorand account details, as loaded from Algod.
   *
   * @see import('./session-algorand.service').SessionAlgorandService
   */
  algorandAccountData?: AccountData;

  /**
   * Asset parameters of interest to the current session.
   *
   * @see import('./session-algorand.service').SessionAlgorandService.loadAssetParams
   */
  algorandAssetParams?: Record<number, AssetParams>;
}

export const createInitialState = (): SessionState => ({});

/**
 * This store holds the data for a user session.
 *
 * Application code should avoid using {@link SessionStore} interface directly:
 * prefer using the {@link SessionQuery} and {@link import('./session.service').SessionService} interfaces instead.
 */
@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'session', resettable: true })
export class SessionStore extends Store<SessionState> {
  constructor() {
    super(createInitialState());
  }
}
