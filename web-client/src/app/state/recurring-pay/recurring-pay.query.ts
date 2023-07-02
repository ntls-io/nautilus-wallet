import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { RecurringPayState, RecurringPayStore } from './recurring-pay.store';

@Injectable({ providedIn: 'root' })
export class RecurringPayQuery extends QueryEntity<RecurringPayState> {
  constructor(protected store: RecurringPayStore) {
    super(store);
  }
}
