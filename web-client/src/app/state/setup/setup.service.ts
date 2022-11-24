import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { SetupStore } from './setup.store';

@Injectable({ providedIn: 'root' })
export class SetupService {
  constructor(private setupStore: SetupStore, private http: HttpClient) {}

  get() {
    return this.http
      .get('')
      .pipe(tap((entities) => this.setupStore.update(entities)));
  }
}
