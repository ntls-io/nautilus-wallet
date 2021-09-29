import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';

export interface OnfidoState {
  token: string | null;
}

export const createInitialState = (): OnfidoState => ({
  token: null,
});

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'onfido' })
export class OnfidoStore extends Store<OnfidoState> {
  constructor() {
    super(createInitialState());
  }
}
