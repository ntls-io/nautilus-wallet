import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { History } from './history.model';

export type HistoryState = EntityState<History>;

@Injectable({ providedIn: 'root' })
@StoreConfig({
  name: 'history',
  idKey: 'date',
  resettable: true,
})
export class HistoryStore extends EntityStore<HistoryState> {
  constructor() {
    super();
  }

  akitaPreAddEntity(
    newEntity: History
  ): History & { date: number | undefined } {
    return {
      ...newEntity,
      date: newEntity.tx?.date,
    };
  }
}
