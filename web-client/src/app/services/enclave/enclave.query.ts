import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { EnclaveStore, EnclaveState } from './enclave.store';

@Injectable({ providedIn: 'root' })
export class EnclaveQuery extends Query<EnclaveState> {

  constructor(protected store: EnclaveStore) {
    super(store);
  }

}
