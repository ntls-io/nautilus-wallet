import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';

export interface StExampleState {
  key: string;
}

export function createInitialState(): StExampleState {
  return {
    key: ''
  };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'stExample' })
export class StExampleStore extends Store<StExampleState> {

  constructor() {
    super(createInitialState());
  }

}
