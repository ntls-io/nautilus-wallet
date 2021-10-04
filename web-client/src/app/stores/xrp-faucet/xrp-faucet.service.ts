import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { XrpFaucetStore } from './xrp-faucet.store';

@Injectable({ providedIn: 'root' })
export class XrpFaucetService {
  constructor(
    private xrpFaucetStore: XrpFaucetStore,
    private http: HttpClient
  ) {}

  async setAccount() {
    this.xrpFaucetStore.setLoading(true);

    await this.http
      .post('https://faucet.altnet.rippletest.net/accounts', {})
      .pipe(tap((entities) => this.xrpFaucetStore.update(entities)))
      .toPromise();

    this.xrpFaucetStore.setLoading(false);
  }
}
