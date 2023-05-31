import { Injectable } from '@angular/core';
import { CapacitorHttp } from '@capacitor/core';
import { ToastController } from '@ionic/angular';
import { createUrlWith } from 'src/app/utils/http.helpers';
import { SessionQuery } from '../session.query';
import { OtpRecipientsStore } from './otp-recipients.store';

const headers = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
};

@Injectable({ providedIn: 'root' })
export class OtpRecipientsService {
  constructor(
    private otpRecipientsStore: OtpRecipientsStore,
    private sessionQuery: SessionQuery,
    private toastCtrl: ToastController
  ) {}

  async createOtpRecipient(recipient: string) {
    const wallet_id = this.sessionQuery.getValue().wallet?.wallet_id;

    const data = {
      wallet_id,
      recipient,
    };
    console.log(data);

    return await CapacitorHttp.post({
      headers,
      url: createUrlWith('otp/recipient/trigger'),
      data,
    })
      .then(({ status }) => {
        if (status === 201) {
          this.getOtpRecipients();
          this.showSuccess('OTP Recipient created');
          return true;
        }
      })
      .catch((error) => {
        console.log(error);
        throw error;
      });
  }

  async getOtpRecipients() {
    const wallet_id = this.sessionQuery.getValue().wallet?.wallet_id;

    if (wallet_id) {
      return await CapacitorHttp.get({
        headers,
        url: createUrlWith('otp/recipient/triggers'),
        params: { wallet_id },
      })
        .then(({ status, data }) => {
          if (status === 200) {
            this.otpRecipientsStore.upsertMany(data);
            this.otpRecipientsStore.remove(
              (entity: { id: string }) =>
                !data.some(
                  (newEntity: { id: string }) => newEntity.id === entity?.id
                )
            );
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  async deleteOtpRecipient(trigger_id: string) {
    return await CapacitorHttp.delete({
      headers,
      url: createUrlWith('otp/recipient/trigger'),
      data: { trigger_id },
    })
      .then(({ status }) => {
        if (status === 204) {
          this.showSuccess('OTP Wallet Address deleted');
          this.otpRecipientsStore.remove(trigger_id);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async showSuccess(message: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2000,
      color: 'success',
    });

    return toast.present();
  }
}
