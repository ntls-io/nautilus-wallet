import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { NNtlsServerStore, NNtlsServerState } from './n-ntls-server.store';

@Injectable({ providedIn: 'root' })
export class NNtlsServerQuery extends Query<NNtlsServerState> {

  constructor(protected store: NNtlsServerStore) {
    super(store);
  }

}
