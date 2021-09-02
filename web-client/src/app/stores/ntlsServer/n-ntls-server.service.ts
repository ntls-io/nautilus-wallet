import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { NNtlsServerStore } from './n-ntls-server.store';

@Injectable({ providedIn: 'root' })
export class NNtlsServerService {

  constructor(private nNtlsServerStore: NNtlsServerStore, private http: HttpClient) {
  }

  get() {
    return this.http.get('').pipe(tap(entities => this.nNtlsServerStore.update(entities)));
  }

}
