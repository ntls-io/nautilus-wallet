import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Capacitor } from '@capacitor/core';
import { LoadingController, ModalController } from '@ionic/angular';
import { isValidAddress } from 'algosdk';
import { ScannerService } from 'src/app/services/scanner.service';
import { WalletService } from 'src/app/services/wallet/wallet.service';
import { SessionQuery } from 'src/app/stores/session/session.query';
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
  error$ = this.sessionQuery.selectError();

  constructor(
    // XXX: Capacitor.isPluginAvailable('Camera') depends on ScannerService, as a side effect.
    private scannerService: ScannerService,
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

  isAdressValid(): boolean {
    if (this.address) {
      return isValidAddress(this.address);
    } else {
      return false;
    }
  }

  async openScanner() {
    await handleScan(this.modalCtrl, this.notification.swal, this.confirm);
  }

  async confirm() {
    if (!this.isAdressValid()) {
      // TODO: Implement better field validation
      await this.notification.swal.fire({
        icon: 'warning',
        title: 'Invalid Address',
        text: 'Please input a valid wallet address',
      });
      return;
    }
    if (this.address) {
      this.address = this.address.trim();
      const pin = await this.presentLock();
      if (!pin) {
        return;
      }
      const loading = await this.loadingCtrl.create();
      await loading.present();
      try {
        const error = await this.walletService.openWallet(this.address, pin);
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
    }
  }

  async presentLock(): Promise<string> {
    const lock = await this.modalCtrl.create({ component: LockscreenPage });

    const result = lock.onWillDismiss();

    await lock.present();
    return (await result).data?.pin;
  }
}
