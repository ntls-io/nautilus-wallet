import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { NtlsServerState, NtlsServerStore } from './ntls-server.store';

@Injectable({ providedIn: 'root' })
export class NtlsServerQuery extends Query<NtlsServerState> {
  constructor(protected store: NtlsServerStore) {
    super(store);
  }
}
