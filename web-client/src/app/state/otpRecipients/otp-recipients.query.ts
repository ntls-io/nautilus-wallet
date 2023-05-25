import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { OtpRecipientsState, OtpRecipientsStore } from './otp-recipients.store';

@Injectable({ providedIn: 'root' })
export class OtpRecipientsQuery extends QueryEntity<OtpRecipientsState> {
  constructor(protected store: OtpRecipientsStore) {
    super(store);
  }

  isOtpRecipient(address: string): boolean {
    const recipients = this.getAll();
    return recipients.some((recipient) => recipient.recipient === address);
  }
}
