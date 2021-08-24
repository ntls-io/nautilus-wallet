import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { StExampleStore, StExampleState } from './st-example.store';

@Injectable({ providedIn: 'root' })
export class StExampleQuery extends Query<StExampleState> {

  constructor(protected store: StExampleStore) {
    super(store);
  }

}
