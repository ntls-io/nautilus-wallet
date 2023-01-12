import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { QuickAccessState, QuickAccessStore } from './quickAccess.store';

@Injectable({ providedIn: 'root' })
export class QuickAccessQuery extends QueryEntity<QuickAccessState> {
  constructor(protected store: QuickAccessStore) {
    super(store);
  }
}
