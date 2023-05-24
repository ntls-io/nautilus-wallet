import { Injectable } from '@angular/core';
import { CapacitorHttp } from '@capacitor/core';
import { ToastController } from '@ionic/angular';
import { createUrlWith } from 'src/app/utils/http.helpers';
import { SessionQuery } from '../../session.query';
import { OtpLimitQuery } from './otp-limit.query';
import { OtpLimitStore } from './otp-limit.store';

const headers = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
};

@Injectable({ providedIn: 'root' })
export class OtpLimitService {
  constructor(
    private otpLimitStore: OtpLimitStore,
    private otpLimitQuery: OtpLimitQuery,
    private sessionQuery: SessionQuery,
    private toastCtrl: ToastController
  ) {}

  async getOtpLimits() {
    const wallet_id = this.sessionQuery.getValue().wallet?.wallet_id;

    if (wallet_id) {
      return await CapacitorHttp.get({
        headers,
        url: createUrlWith('otp/limit/triggers'),
        params: { wallet_id },
      })
        .then(({ status, data }) => {
          if (status === 200) {
            this.otpLimitStore.upsertMany(data);
            this.otpLimitStore.remove(
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

  async setOtpLimit(otpLimit: {
    id?: string;
    currency_code: string;
    limit: number;
  }) {
    console.log('Function initiated...');
    const wallet_id = this.sessionQuery.getValue().wallet?.wallet_id;
    const limits = await this.otpLimitQuery.selectAll().toPromise();

    const existingLimit = limits?.find(
      (limit) => limit.currency_code === otpLimit.currency_code
    );

    const data = {
      wallet_id,
      ...otpLimit,
      id: existingLimit?.id ?? null,
    };

    try {
      const { status } = await CapacitorHttp.put({
        headers,
        url: createUrlWith('otp/limit/set'),
        data,
      });

      if (status === 200) {
        this.getOtpLimits();
        this.showSuccess('Limit Threshold Set!');
        return true;
      }
    } catch (error) {
      console.log(error);
    }
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
