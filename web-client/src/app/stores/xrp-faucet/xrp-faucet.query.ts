import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { XrpFaucetState, XrpFaucetStore } from './xrp-faucet.store';

@Injectable({ providedIn: 'root' })
export class XrpFaucetQuery extends Query<XrpFaucetState> {
  constructor(protected store: XrpFaucetStore) {
    super(store);
  }
}
