import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';
import { AccountData, AssetParams } from 'src/app/services/algosdk.utils';
import { OnfidoCheckResult } from 'src/schema/actions';
import { WalletDisplay } from 'src/schema/entities';
import * as xrpl from 'xrpl';

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

  /**
   * The current session's XRPL account root ledger entry.
   *
   * @see import('./session-xrpl.service').SessionXrplService
   * @see https://js.xrpl.org/interfaces/LedgerEntry.AccountRoot.html
   */
  xrplAccountRoot?: xrpl.LedgerEntry.AccountRoot;

  /**
   * The current session's XRPL balances.
   *
   * @see import('./session-xrpl.service').SessionXrplService
   * @see https://js.xrpl.org/classes/Client.html#getBalances
   */
  xrplBalances?: XrplBalance[];

  onfidoCheck?: OnfidoCheckResult;
}

export type XrplBalance = {
  value: string;
  currency: string;
  issuer?: string | undefined;
};

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
