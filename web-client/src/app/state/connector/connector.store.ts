import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';
import { WalletId } from 'src/schema/types';

export interface ConnectorState {
  walletId: WalletId | undefined;
}

const createInitialState = (): ConnectorState => ({ walletId: undefined });

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'connector', resettable: false })
export class ConnectorStore extends Store<ConnectorState> {
  constructor() {
    super(createInitialState());
  }
}
