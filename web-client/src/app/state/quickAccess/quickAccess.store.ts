import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { QuickAccess } from './quickAccess.model';

export type QuickAccessState = EntityState<QuickAccess>;

@Injectable({ providedIn: 'root' })
@StoreConfig({
  name: 'quickAccess',
  resettable: true,
})
export class QuickAccessStore extends EntityStore<QuickAccessState> {
  constructor() {
    super();
  }
}
