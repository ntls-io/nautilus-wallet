import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { OtpLimit } from './otp-limit.model';
import { OtpLimitState, OtpLimitStore } from './otp-limit.store';

@Injectable({ providedIn: 'root' })
export class OtpLimitQuery extends QueryEntity<OtpLimitState> {
  constructor(protected store: OtpLimitStore) {
    super(store);
  }

  isOtpLimit(currencyCode: string, amount: number): boolean {
    const otpLimit = this.getEntityByCurrency(currencyCode);
    if (otpLimit) {
      return amount > otpLimit.limit;
    }
    return false;
  }

  getEntityByCurrency(currencyCode: string): OtpLimit | undefined {
    return this.getAll().find((limit) => limit.currency_code === currencyCode);
  }
}
