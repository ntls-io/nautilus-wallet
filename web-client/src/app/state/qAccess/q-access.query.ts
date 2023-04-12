import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { QAccessState, QAccessStore } from './q-access.store';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class QAccessQuery extends QueryEntity<QAccessState> {
  walletAddresses$ = this.selectAll().pipe(
    map(qAccessArray => qAccessArray.map(qAccess => qAccess.walletAddress))
  );

  constructor(protected store: QAccessStore) {
    super(store);
  }
}
