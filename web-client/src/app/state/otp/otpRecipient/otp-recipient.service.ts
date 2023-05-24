import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CapacitorHttp } from '@capacitor/core';
import { ToastController } from '@ionic/angular';
import { createUrlWith } from 'src/app/utils/http.helpers';
import { SessionQuery } from '../../session.query';
import { OtpRecipientStore } from './otp-recipient.store';

const headers = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
};

@Injectable({ providedIn: 'root' })
export class OtpRecipientService {
  constructor(
    private otpRecipientStore: OtpRecipientStore,
    private sessionQuery: SessionQuery,
    private toastCtrl: ToastController,
    private http: HttpClient
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
            this.otpRecipientStore.upsertMany(data);
            this.otpRecipientStore.remove(
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

  async deleteOtpRecipient(delete_id: string) {
    return await CapacitorHttp.delete({
      headers,
      url: createUrlWith('otp/recipient/trigger'),
      data: { trigger_id: delete_id },
    })
      .then(({ status }) => {
        if (status === 204) {
          this.showSuccess('OTP Wallet Address deleted');
          this.otpRecipientStore.remove(delete_id);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async showSuccess(message: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 3000,
      color: 'success',
    });

    return toast.present();
  }
}
