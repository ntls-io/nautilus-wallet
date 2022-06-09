import { Injectable } from '@angular/core';
import { ConnectorStore } from './connector.store';

@Injectable({ providedIn: 'root' })
export class ConnectorService {
  constructor(private connectorStore: ConnectorStore) {}

  async becomeConnector(walletId: string) {
    return await this.connectorStore.update({ walletId });
  }
}
