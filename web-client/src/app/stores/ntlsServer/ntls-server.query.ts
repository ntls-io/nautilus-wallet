import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { NtlsServerStore, NtlsServerState } from './ntls-server.store';

@Injectable({ providedIn: 'root' })
export class NtlsServerQuery extends Query<NtlsServerState> {

  constructor(protected store: NtlsServerStore) {
    super(store);
  }

}
