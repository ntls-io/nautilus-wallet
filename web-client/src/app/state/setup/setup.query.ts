import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { environment } from 'src/environments/environment';
import { SetupState, SetupStore } from './setup.store';

@Injectable({ providedIn: 'root' })
export class SetupQuery extends Query<SetupState> {
  tokenIssuer = this.getValue().tokenIssuer.trim() || environment.tokenIssuer;
  xrpIssuer = this.getValue().xrpIssuer.trim() || environment.xrpIssuer;
  tokenSymbol = this.getValue().tokenSymbol.trim() || environment.tokenSymbol;
  ledger = this.getValue().ledger.trim()
    ? { ...environment.xrplClient, server: this.getValue().ledger }
    : environment.xrplClient;
  logo = this.select('logo');

  constructor(protected store: SetupStore) {
    super(store);
  }
}
