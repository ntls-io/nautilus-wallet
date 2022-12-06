import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { HistoryStore, HistoryState } from './history.store';

@Injectable({ providedIn: 'root' })
export class HistoryQuery extends QueryEntity<HistoryState> {

  constructor(protected store: HistoryStore) {
    super(store);
  }

}
