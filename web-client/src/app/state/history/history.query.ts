import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { SetupQuery } from '../setup';
import { HistoryState, HistoryStore } from './history.store';

@Injectable({ providedIn: 'root' })
export class HistoryQuery extends QueryEntity<HistoryState> {
  transactions = this.selectAll({
    filterBy: ({ tx }: any) => tx?.TransactionType === 'Payment',
  });

  constructor(protected store: HistoryStore, private setupQuery: SetupQuery) {
    super(store);
  }
}
