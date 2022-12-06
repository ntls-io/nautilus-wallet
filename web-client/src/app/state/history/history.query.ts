import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { HistoryState, HistoryStore } from './history.store';

@Injectable({ providedIn: 'root' })
export class HistoryQuery extends QueryEntity<HistoryState> {
  transactions = this.selectAll();

  constructor(protected store: HistoryStore) {
    super(store);
  }
}
