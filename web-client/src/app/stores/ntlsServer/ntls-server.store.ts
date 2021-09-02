import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';

export interface NtlsServerState {
  key: string;
}

export const createInitialState = (): NtlsServerState => ({ key: '' });

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'ntlsServer' })
export class NtlsServerStore extends Store<NtlsServerState> {
  constructor() {
    super(createInitialState());
  }
}
