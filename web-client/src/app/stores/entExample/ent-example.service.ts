import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { EntExampleStore } from './ent-example.store';

@Injectable({ providedIn: 'root' })
export class EntExampleService {

  constructor(private entExampleStore: EntExampleStore, private http: HttpClient) {
  }

  get() {
    return this.http.get('').pipe(tap(entities => this.entExampleStore.set(entities)));
  }

}
