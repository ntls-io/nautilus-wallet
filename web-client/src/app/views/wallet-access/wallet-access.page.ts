import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ModalController } from '@ionic/angular';
import { isValidAddress } from 'algosdk';
import { WalletService } from 'src/app/services/wallet/wallet.service';
import { SwalHelper } from 'src/app/utils/notification/swal-helper';
import {
  LockscreenPage,
  LockscreenResult,
} from 'src/app/views/lockscreen/lockscreen.page';
import { ScannerService } from '../../services/scanner.service';

@Component({
  selector: 'app-wallet-access',
  templateUrl: './wallet-access.page.html',
  styleUrls: ['./wallet-access.page.scss'],
})
export class WalletAccessPage implements OnInit {
  address: string | undefined;

  constructor(
    private scannerService: ScannerService,
    private modalCtrl: ModalController,
    private walletService: WalletService,
    private notification: SwalHelper,
    private router: Router,
    private loadingCtrl: LoadingController
  ) {}

  ngOnInit() {}

  async handleScanner() {
    const { data } = await this.scannerService.scannerHandler();
    if (data?.type === 'scanSuccess') {
      this.confirm(data.result);
    }
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

  async presentLock(): Promise<string | undefined> {
    const lock = await this.modalCtrl.create({ component: LockscreenPage });

    const result = lock.onDidDismiss<LockscreenResult>();
    await lock.present();

    const { data } = await result;
    return data?.pin;
  }
}
