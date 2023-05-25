import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { OtpRecipient } from './otp-recipient.model';

export type OtpRecipientsState = EntityState<OtpRecipient>;

@Injectable({ providedIn: 'root' })
@StoreConfig({
  name: 'otpRecipients',
  resettable: true,
})
export class OtpRecipientsStore extends EntityStore<OtpRecipientsState> {
  constructor() {
    super();
  }
}
