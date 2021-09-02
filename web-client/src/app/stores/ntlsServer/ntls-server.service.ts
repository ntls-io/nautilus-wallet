import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { NtlsServerStore } from './ntls-server.store';

@Injectable({ providedIn: 'root' })
export class NtlsServerService {

  constructor(private ntlsServerStore: NtlsServerStore, private http: HttpClient) {
  }

  get() {
    return this.http.get('').pipe(tap(entities => this.ntlsServerStore.update(entities)));
  }

}
