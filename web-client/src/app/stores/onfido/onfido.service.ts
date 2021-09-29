import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { WalletQuery } from 'src/app/wallet.query';
import { OnfidoStore } from './onfido.store';

@Injectable({ providedIn: 'root' })
export class OnfidoService {
  constructor(
    private onfidoStore: OnfidoStore,
    private http: HttpClient,
    private walletQuery: WalletQuery
  ) {}

  getToken() {
    const { name } = this.walletQuery.getValue();
    return this.http
      .post('kyc/start', name)
      .pipe(tap((token) => this.onfidoStore.update(token)));
  }
}
