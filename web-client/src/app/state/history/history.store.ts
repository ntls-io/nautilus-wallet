import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { History } from './history.model';

export interface HistoryState extends EntityState<History> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({
  name: 'history'
})
export class HistoryStore extends EntityStore<HistoryState> {

  constructor() {
    super();
  }

}
