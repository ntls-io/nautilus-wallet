import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import {
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
  daysInMonth: number[] = [-1, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  constructor(
    private modalCtrl: ModalController,
    private navCtrl: NavController,
    private sessionQuery: SessionQuery,
    private notification: SwalHelper,
    public recurringPayQuery: RecurringPayQuery,
    private recurringPayService: RecurringPayService
  ) {}

  ngOnInit() {}

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

  isLeapYear(year: number): boolean {
    // year -> 1 if leap year, else 0.
    return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
  }

  getOrdinalToDate(ordinal: number): Date {
    let year = 1;
    let daysLeft = ordinal;

    while (daysLeft > 365) {
      const daysInYear = this.isLeapYear(year) ? 366 : 365;
      if (daysLeft <= daysInYear) {
        break;
      }
      daysLeft -= daysInYear;
      year++;
    }

    let month = 1;
    while (daysLeft > this.daysInMonth[month]) {
      if (month === 2 && this.isLeapYear(year)) {
        if (daysLeft <= this.daysInMonth[month] + 1) {
          break;
        }
        daysLeft -= this.daysInMonth[month] + 1;
      } else {
        daysLeft -= this.daysInMonth[month];
      }
      month++;
    }

    const day = daysLeft;

    return new Date(year, month - 1, day);
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
