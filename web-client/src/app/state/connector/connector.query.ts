import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { ConnectorStore, ConnectorState } from './connector.store';

@Injectable({ providedIn: 'root' })
export class ConnectorQuery extends Query<ConnectorState> {

  constructor(protected store: ConnectorStore) {
    super(store);
  }

}
