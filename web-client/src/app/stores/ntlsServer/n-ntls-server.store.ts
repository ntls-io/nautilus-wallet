import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';

export interface NNtlsServerState {
  key: string;
}

export function createInitialState(): NNtlsServerState {
  return {
    key: ''
  };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'nNtlsServer' })
export class NNtlsServerStore extends Store<NNtlsServerState> {

  constructor() {
    super(createInitialState());
  }

}
