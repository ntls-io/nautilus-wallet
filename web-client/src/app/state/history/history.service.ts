import { Injectable } from '@angular/core';
import { XrplService } from 'src/app/services/xrpl.service';
import { HistoryStore } from './history.store';

@Injectable({ providedIn: 'root' })
export class HistoryService {
  constructor(
    private historyStore: HistoryStore,
    private xrplService: XrplService
  ) {}

  async getTxList() {
    await this.xrplService.getAccountTx().then(({ result }) => {
      const { transactions } = result;
      console.log(transactions);
      this.historyStore.upsertMany(transactions);
    });
  }
}
