import { Component, OnInit } from '@angular/core';
import { Clipboard } from '@capacitor/clipboard';
import { ToastController } from '@ionic/angular';
import {
  QAccess,
  QAccessQuery,
  QAccessService,
  QAccessStore,
} from 'src/app/state/qAccess';
import { SwalHelper } from 'src/app/utils/notification/swal-helper';
import { environment } from 'src/environments/environment';
import { showToast } from '../../utils/toast.helpers';

@Component({
  selector: 'app-quick-access',
  templateUrl: './quick-access.component.html',
  styleUrls: ['./quick-access.component.scss'],
})
export class QuickAccessComponent implements OnInit {
  hideSavedWalletAddress = environment.enableQuickAccess;

  public Clipboard = Clipboard;

  constructor(
    private quickAccessService: QAccessService,
    private quickAccessStore: QAccessStore,
    private toastCtrl: ToastController,
    public quickAccessQuery: QAccessQuery,
    private notification: SwalHelper
  ) {}

  async ionViewWillEnter() {
    await this.quickAccessService.fetchWalletAddresses();
  }

  ngOnInit() {}

  async deleteAddress(address: QAccess) {
    this.notification.swal.fire({
      icon: 'warning',
      titleText: 'Delete Saved Wallet Address',
      text: 'Are you sure you want to delete this Wallet Address?',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      showLoaderOnConfirm: true,
      confirmButtonColor: 'var(--ion-color-primary)',
      cancelButtonColor: 'var(--ion-color-medium)',
      reverseButtons: true,
      preConfirm: async () => {
        await this.quickAccessService.deleteAddress(address.walletAddress);
        this.quickAccessStore.remove(address.id);
        this.showSuccess('Wallet Address deleted');
      },
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

  async copyAddress(address: string) {
    await this.Clipboard.write({
      // eslint-disable-next-line id-blacklist
      string: address?.toString(),
    })
      .then(() => {
        this.notice('Address copied!');
      })
      .catch((err) => {
        this.notice('Something weird happened, please try again!');
        console.log(err);
      });
  }

  async notice(message: string): Promise<HTMLIonToastElement> {
    return showToast(this.toastCtrl, message, {
      color: 'success',
      duration: 2000,
    });
  }
}
