import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { HistoryStore } from './history.store';

@Injectable({ providedIn: 'root' })
export class HistoryService {

  constructor(private historyStore: HistoryStore, private http: HttpClient) {
  }

  get() {
    return this.http.get('').pipe(tap(entities => this.historyStore.set(entities)));
  }

}
