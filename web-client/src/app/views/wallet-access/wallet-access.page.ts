import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Capacitor } from '@capacitor/core';
import { LoadingController, ModalController } from '@ionic/angular';
import { isValidAddress } from 'algosdk';
import { WalletService } from 'src/app/services/wallet/wallet.service';
import { SessionQuery } from 'src/app/stores/session';
import { SwalHelper } from 'src/app/utils/notification/swal-helper';
import { LockscreenPage } from '../lockscreen/lockscreen.page';
import { handleScan } from '../scanner.helpers';

@Component({
  selector: 'app-wallet-access',
  templateUrl: './wallet-access.page.html',
  styleUrls: ['./wallet-access.page.scss'],
})
export class WalletAccessPage implements OnInit {
  hasCamera: boolean | undefined;
  address: string | undefined;

  constructor(
    // XXX: Capacitor.isPluginAvailable('Camera') depends on ScannerService, as a side effect.
    private modalCtrl: ModalController,
    private walletService: WalletService,
    private notification: SwalHelper,
    private sessionQuery: SessionQuery,
    private router: Router,
    private loadingCtrl: LoadingController
  ) {}

  ngOnInit() {
    // XXX: Capacitor.isPluginAvailable('Camera') depends on ScannerService, as a side effect.
    this.hasCamera = Capacitor.isPluginAvailable('Camera');
  }

  async openScanner() {
    await handleScan(this.modalCtrl, this.notification.swal, this.confirm);
  }

  async confirm(value: string | undefined) {
    const address = value?.trim();

    if (address && isValidAddress(address)) {
      const pinPromise = this.presentLock();
      const loading = await this.loadingCtrl.create();
      const pin = await pinPromise;
      if (!pin) {
        return;
      }
      await loading.present();
      try {
        const error = await this.walletService.openWallet(address, pin);
        if (error) {
          await this.notification.swal.fire({
            icon: 'error',
            title: 'Open Wallet Failed',
            text: error,
          });
        } else {
          this.router.navigate(['/wallet']);
        }
      } finally {
        await loading.dismiss();
      }
    } else {
      await this.notification.swal.fire({
        icon: 'warning',
        title: 'Invalid Address',
        text: 'Please input a valid wallet address',
      });
    }
  }

  async presentLock(): Promise<string> {
    const lock = await this.modalCtrl.create({ component: LockscreenPage });

    const result = lock.onWillDismiss();
    await lock.present();

    const { data } = await result;
    return data?.pin;
  }
}
