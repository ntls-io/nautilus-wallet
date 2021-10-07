import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { OnfidoStore } from './onfido.store';

@Injectable({ providedIn: 'root' })
export class OnfidoService {

  constructor(private onfidoStore: OnfidoStore, private http: HttpClient) {
  }

  get() {
    return this.http.get('').pipe(tap(entities => this.onfidoStore.update(entities)));
  }

}
