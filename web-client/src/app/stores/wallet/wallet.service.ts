import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { WalletStore } from './wallet.store';

@Injectable({ providedIn: 'root' })
export class WalletService {
  constructor(private walletStore: WalletStore, private http: HttpClient) {}

  get() {
    return this.http
      .get('')
      .pipe(tap((entities) => this.walletStore.update(entities)));
  }
}
