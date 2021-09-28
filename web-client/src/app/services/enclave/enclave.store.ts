import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';

export interface EnclaveState {
  key: string;
}

export function createInitialState(): EnclaveState {
  return {
    key: ''
  };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'enclave' })
export class EnclaveStore extends Store<EnclaveState> {

  constructor() {
    super(createInitialState());
  }

}
