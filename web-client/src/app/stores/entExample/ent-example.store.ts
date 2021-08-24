import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { EntExample } from './ent-example.model';

export interface EntExampleState extends EntityState<EntExample> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({
  name: 'entExample',
  idKey: 'code',
})
export class EntExampleStore extends EntityStore<EntExampleState> {
  constructor() {
    super();
  }
}
