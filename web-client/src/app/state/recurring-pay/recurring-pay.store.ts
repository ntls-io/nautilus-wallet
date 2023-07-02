import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { RecurringPay } from './recurring-pay.model';

export type RecurringPayState = EntityState<RecurringPay>;

@Injectable({ providedIn: 'root' })
@StoreConfig({
  name: 'recurring-pay',
  resettable: true,
})
export class RecurringPayStore extends EntityStore<RecurringPayState> {
  constructor() {
    super();
  }
}
