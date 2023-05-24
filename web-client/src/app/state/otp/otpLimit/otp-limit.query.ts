import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { OtpLimitStore, OtpLimitState } from './otp-limit.store';
import { OtpLimit } from './otp-limit.model';

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

  private getEntityByCurrency(currencyCode: string): OtpLimit | undefined {
    return this.getAll().find(limit => limit.currency_code === currencyCode);
  }

}
