import { Injectable } from '@angular/core';
import { WalletId } from 'src/schema/types';
import { ConnectorStore } from './connector.store';

@Injectable({ providedIn: 'root' })
export class ConnectorService {
  constructor(private connectorStore: ConnectorStore) {}

  becomeConnector(walletId: WalletId | undefined) {
    this.connectorStore.update({ walletId });
  }
}
