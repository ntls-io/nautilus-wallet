import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { ConnectorState, ConnectorStore } from './connector.store';

@Injectable({ providedIn: 'root' })
export class ConnectorQuery extends Query<ConnectorState> {
  isConnector = this.select(({ walletId }) => walletId !== undefined);

  constructor(protected store: ConnectorStore) {
    super(store);
  }
}