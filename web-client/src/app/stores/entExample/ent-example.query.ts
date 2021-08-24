import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { EntExampleState, EntExampleStore } from './ent-example.store';

@Injectable({ providedIn: 'root' })
export class EntExampleQuery extends QueryEntity<EntExampleState> {
  constructor(protected store: EntExampleStore) {
    super(store);
  }
}
