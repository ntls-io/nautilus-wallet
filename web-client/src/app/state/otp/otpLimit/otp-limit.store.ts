import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { OtpLimit } from './otp-limit.model';

export type OtpLimitState = EntityState<OtpLimit>;

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'otpLimit', resettable: true })
export class OtpLimitStore extends EntityStore<OtpLimitState> {

  constructor() {
    super();
  }

}
