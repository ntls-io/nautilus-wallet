import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';

export interface OnfidoState {
  token: string;
}

export const createInitialState = (): OnfidoState => ({
  token: 'api_sandbox.PTV5VS6ghrM.F1HzpgpoU54ZCwzJXCU9l-U3EL8nIoZY',
});

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'onfido' })
export class OnfidoStore extends Store<OnfidoState> {
  constructor() {
    super(createInitialState());
  }
}
