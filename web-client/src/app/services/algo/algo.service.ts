import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { AlgoStore } from './algo.store';

@Injectable({ providedIn: 'root' })
export class AlgoService {

  constructor(private algoStore: AlgoStore, private http: HttpClient) {
  }

  get() {
    return this.http.get('').pipe(tap(entities => this.algoStore.update(entities)));
  }

}
