import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { StExampleStore } from './st-example.store';

@Injectable({ providedIn: 'root' })
export class StExampleService {

  constructor(private stExampleStore: StExampleStore, private http: HttpClient) {
  }

  get() {
    return this.http.get('').pipe(tap(entities => this.stExampleStore.update(entities)));
  }

}
