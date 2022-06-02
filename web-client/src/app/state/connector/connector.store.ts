import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';

export interface ConnectorState {
  optin: boolean;
}

const createInitialState = (): ConnectorState => ({ optin: false });

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'connector', resettable: false })
export class ConnectorStore extends Store<ConnectorState> {
  constructor() {
    super(createInitialState());
  }
}
