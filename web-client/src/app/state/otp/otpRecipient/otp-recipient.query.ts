import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { OtpRecipientState, OtpRecipientStore } from './otp-recipient.store';

@Injectable({ providedIn: 'root' })
export class OtpRecipientQuery extends QueryEntity<OtpRecipientState> {
  constructor(protected store: OtpRecipientStore) {
    super(store);
  }

  isOtpRecipient(address: string): boolean {
    const recipients = this.getAll();
    return recipients.some((recipient) => recipient.recipient === address);
  }
}
