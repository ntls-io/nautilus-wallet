import { Injectable } from '@angular/core';
import {
  randBitcoinAddress,
  randBoolean,
  randCurrencyCode,
  randCurrencyName,
  randFloat,
  randSvg,
} from '@ngneat/falso';
import { AccountStore } from './account.store';

@Injectable({ providedIn: 'root' })
export class AccountService {
  constructor(private accountStore: AccountStore) {}

  async createAccounts() {
    this.accountStore.setLoading(true);
    this.accountStore.reset();

    Array.from({ length: 3 }, (x, id) => {
      const account: any = {
        walletId: randBitcoinAddress(),
        balance: randFloat(),
        symbol: randSvg(),
        currency: randCurrencyName(),
        code: randCurrencyCode(),
        hasAssets: randBoolean(),
        id,
      };
      console.log(account);
      this.accountStore.add(account);
    });
    this.accountStore.setLoading(false);
  }
}
