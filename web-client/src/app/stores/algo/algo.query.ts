import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { AlgoState, AlgoStore } from './algo.store';

@Injectable({ providedIn: 'root' })
export class AlgoQuery extends Query<AlgoState> {
  constructor(protected store: AlgoStore) {
    super(store);
  }
}
