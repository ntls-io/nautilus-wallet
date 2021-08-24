import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { EntExampleStore } from './ent-example.store';

const url = 'https://randommer.io/api/Misc/Cultures';

@Injectable({ providedIn: 'root' })
export class EntExampleService {
  constructor(
    private entExampleStore: EntExampleStore,
    private http: HttpClient
  ) {}

  getRandom(quantity = 5) {
    return this.http
      .get(`${url}`, {
        headers: new HttpHeaders().set(
          'X-Api-Key',
          'e71ff65bb0ea423f950588683c1cab2b'
        ),
      })
      .pipe(tap((entities: any) => this.entExampleStore.set(entities)))
      .subscribe();
  }
}
