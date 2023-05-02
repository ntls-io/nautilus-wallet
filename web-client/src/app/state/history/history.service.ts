import { Injectable } from '@angular/core';
import { XrplService } from 'src/app/services/xrpl.service';
import { SessionQuery } from '../session.query';
import { HistoryStore } from './history.store';

@Injectable({ providedIn: 'root' })
export class HistoryService {
  constructor(
    private historyStore: HistoryStore,
    private xrplService: XrplService,
    private sessionQuery: SessionQuery
  ) {}

  async getTxList() {
    const address = this.sessionQuery.getValue().wallet?.wallet_id;
    if (address) {
      await this.xrplService.getAccountTx(address).then(({ result }) => {
        const { transactions } = result;
        this.historyStore.set(transactions);
      });
    }
  }
}
