import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { History } from './history.model';

export interface HistoryState extends EntityState<History> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({
  name: 'history',
  idKey: 'seq',
  resettable: true,
})
export class HistoryStore extends EntityStore<HistoryState> {
  constructor() {
    super();
  }

  akitaPreUpdateEntity(
    oldEntity: History,
    newEntity: History
  ): History & { seq: number | undefined } {
    return {
      ...newEntity,
      seq: newEntity?.tx?.Sequence ?? oldEntity?.tx?.date,
    };
  }
}
