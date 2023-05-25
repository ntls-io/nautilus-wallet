import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { OtpLimit } from './otp-limit.model';

export type OtpLimitsState = EntityState<OtpLimit>;

@Injectable({ providedIn: 'root' })
@StoreConfig({
  name: 'otpLimits',
  resettable: true,
  idKey: 'currency_code',
})
export class OtpLimitsStore extends EntityStore<OtpLimitsState> {
  constructor() {
    super();
  }
}
