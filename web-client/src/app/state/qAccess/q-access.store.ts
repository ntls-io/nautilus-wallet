import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { QAccess } from './q-access.model';

export interface QAccessState extends EntityState<QAccess> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({
  name: 'qAccess'
})
export class QAccessStore extends EntityStore<QAccessState> {

  constructor() {
    super();
  }

}
