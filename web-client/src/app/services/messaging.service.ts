import { Injectable } from '@angular/core';
import { NautilusAssetServicesService } from 'src/app/services/nautilus-asset-services.service';

@Injectable({
  providedIn: 'root',
})
export class MessagingService {
  constructor(private nautilusAssetServices: NautilusAssetServicesService) {}

  async sendMessage(message: SendMessage): Promise<Message> {
    return await this.nautilusAssetServices.post<SendMessage, Message>(
      'messages/create',
      message
    );
  }
}

type SendMessage = {
  to_phone_number: string;
  body: string;
};

/**
 * @see https://www.twilio.com/docs/sms/api/message-resource#message-properties
 */
export type Message = {
  account_sid?: string;
  sid?: string;

  // TODO: Remaining fields, if needed.
};
