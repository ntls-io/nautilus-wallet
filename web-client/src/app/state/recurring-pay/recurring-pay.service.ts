import { Injectable } from '@angular/core';
import { CapacitorHttp } from '@capacitor/core';
import { ToastController } from '@ionic/angular';
import { createUrlWith } from 'src/app/utils/http.helpers';
import { SessionQuery } from '../session.query';
import { RecurringPayStore } from './recurring-pay.store';

const headers = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
};

@Injectable({ providedIn: 'root' })
export class RecurringPayService {
  constructor(
    private recurringPayStore: RecurringPayStore,
    private sessionQuery: SessionQuery,
    private toastCtrl: ToastController
  ) {}

  async createRecurringPayment(recurringPayment: RecurringPayment) {
    const data = recurringPayment;

    return await CapacitorHttp.post({
      headers,
      url: createUrlWith('recurring/payment'),
      data,
    })
      .then(({ status }) => {
        if (status === 201) {
          this.getRecurringPayments();
          this.showSuccess('Recurring payment scheduled!');
          return true;
        }
      })
      .catch((error) => {
        console.log(error);
        throw error;
      });
  }

  async getRecurringPayments() {
    const wallet_id = this.sessionQuery.getValue().wallet?.wallet_id;

    if (wallet_id) {
      return await CapacitorHttp.get({
        headers,
        url: createUrlWith('recurring/payments'),
        params: { wallet_id },
      })
        .then(({ status, data }) => {
          if (status === 200) {
            this.recurringPayStore.upsertMany(data);
            this.recurringPayStore.remove(
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

  async deleteRecurringPayment(recurring_payment_id: string) {
    return await CapacitorHttp.delete({
      headers,
      url: createUrlWith('recurring/payment'),
      data: { recurring_payment_id },
    })
      .then(({ status }) => {
        if (status === 204) {
          this.showSuccess('Recurring payment deleted!');
          this.recurringPayStore.remove(recurring_payment_id);
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

interface RecurringPayment {
  wallet_id: string;
  wallet_public_key: string;
  recipient: string;
  amount: number;
  currency_code: string;
  payment_start_date: number;
  frequency: number;
  payment_end_date: number;
}
