import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { OtpRecipient } from './otp-recipient.model';

export type OtpRecipientState = EntityState<OtpRecipient>;

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'otpRecipient' })
export class OtpRecipientStore extends EntityStore<OtpRecipientState> {
  constructor() {
    super();
  }
}
