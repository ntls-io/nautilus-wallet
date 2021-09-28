import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { EnclaveStore } from './enclave.store';

@Injectable({ providedIn: 'root' })
export class EnclaveService {

  constructor(private enclaveStore: EnclaveStore, private http: HttpClient) {
  }

  get() {
    return this.http.get('').pipe(tap(entities => this.enclaveStore.update(entities)));
  }

}
