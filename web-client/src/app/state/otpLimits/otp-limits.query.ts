import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { OtpLimit } from './otp-limit.model';
import { OtpLimitsState, OtpLimitsStore } from './otp-limits.store';

@Injectable({ providedIn: 'root' })
export class OtpLimitsQuery extends QueryEntity<OtpLimitsState> {
  constructor(protected store: OtpLimitsStore) {
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
