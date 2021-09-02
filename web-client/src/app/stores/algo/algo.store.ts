import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';

export interface AlgoState {
  key: string;
}

export const createInitialState = (): AlgoState => ({ key: '' });

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'algo' })
export class AlgoStore extends Store<AlgoState> {
  constructor() {
    super(createInitialState());
  }
}
