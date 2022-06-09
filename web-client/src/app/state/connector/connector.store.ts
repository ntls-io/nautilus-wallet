import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';

export interface ConnectorState {
  walletId: string | null;
}

const createInitialState = (): ConnectorState => ({
  walletId: null,
});

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'connector', resettable: false })
export class ConnectorStore extends Store<ConnectorState> {
  constructor() {
    super(createInitialState());
  }
}
