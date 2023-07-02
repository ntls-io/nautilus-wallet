import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import {
  RecurringPay,
  RecurringPayQuery,
  RecurringPayService,
} from 'src/app/state/recurring-pay';
import { SessionQuery } from 'src/app/state/session.query';
import { SwalHelper } from 'src/app/utils/notification/swal-helper';
import { addressType } from 'src/app/utils/validators';
import { ManualAddressPage } from '../manual-address/manual-address.page';
@Component({
  selector: 'app-recurring-pay',
  templateUrl: './recurring-pay.page.html',
  styleUrls: ['./recurring-pay.page.scss'],
})
export class RecurringPayPage implements OnInit {
  transferType: any;
  recurringPayments: RecurringPay[] = [];

  constructor(
    private modalCtrl: ModalController,
    private navCtrl: NavController,
    private sessionQuery: SessionQuery,
    private notification: SwalHelper,
    public recurringPayQuery: RecurringPayQuery,
    private recurringPayService: RecurringPayService
  ) {}

  ngOnInit() {
    this.recurringPayments = this.recurringPayQuery.getAll();
  }

  async ionViewWillEnter() {
    await this.recurringPayService.getRecurringPayments();
  }

  async addRecurringPay() {
    const wallet_id = this.sessionQuery.getValue().wallet?.wallet_id;
    const placeholder = "Enter recipient's address";
    const modal = await this.modalCtrl.create({
      component: ManualAddressPage,
      componentProps: { wallet_id, placeholder },
    });

    await modal.present();

    const { data } = await modal.onDidDismiss();
    if (data?.success && data?.address) {
      if (addressType(data?.address)) {
        const { address } = data;
        this.navCtrl.navigateForward('schedule-pay', {
          state: { address },
        });
      } else {
        this.notification.showInvalidAddress();
      }
    }
  }

  deleteRecurringPayment(id: string) {
    this.notification.swal.fire({
      icon: 'warning',
      titleText: 'Delete Payment Schedule',
      text: 'Are you sure you want to delete this payment schedule?',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      showLoaderOnConfirm: true,
      confirmButtonColor: 'var(--ion-color-primary)',
      cancelButtonColor: 'var(--ion-color-medium)',
      reverseButtons: true,
      preConfirm: async () => {
        await this.recurringPayService.deleteRecurringPayment(id);
      },
    });
  }
}
