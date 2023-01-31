import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { QAccessState, QAccessStore } from './q-access.store';

@Injectable({ providedIn: 'root' })
export class QAccessQuery extends QueryEntity<QAccessState> {
  constructor(protected store: QAccessStore) {
    super(store);
  }
}
