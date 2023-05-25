import { Injectable } from '@angular/core';
import { CapacitorHttp } from '@capacitor/core';
import { ToastController } from '@ionic/angular';
import { createUrlWith } from 'src/app/utils/http.helpers';
import { SwalHelper } from 'src/app/utils/notification/swal-helper';
import { SessionQuery } from '../session.query';
import { OtpLimitsQuery } from './otp-limits.query';
import { OtpLimitsStore } from './otp-limits.store';

const headers = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
};

@Injectable({ providedIn: 'root' })
export class OtpLimitsService {
  constructor(
    private otpLimitsStore: OtpLimitsStore,
    private otpLimitsQuery: OtpLimitsQuery,
    private notification: SwalHelper,
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
            this.otpLimitsStore.upsertMany(data);
            this.otpLimitsStore.remove(
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
    const wallet_id = this.sessionQuery.getValue().wallet?.wallet_id;
    const existingLimit = this.otpLimitsQuery.getEntityByCurrency(
      otpLimit.currency_code
    );

    const data = {
      wallet_id,
      ...otpLimit,
    };
    // console.log(existingLimit);
    // if (existingLimit?.id) {
    //   data.id = existingLimit.map.id;
    // }

    return await CapacitorHttp.put({
      headers,
      url: createUrlWith('otp/limit/set'),
      data,
    })
      .then(({ status }) => {
        if (status === 200) {
          this.getOtpLimits();
          this.showSuccess('Limit Threshold Set!');
          return true;
        }
      })
      .catch((error) => {
        console.log(error);
        this.notification.showUnexpectedFailureWarning();
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
