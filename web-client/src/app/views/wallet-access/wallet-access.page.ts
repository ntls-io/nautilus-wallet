import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Capacitor } from '@capacitor/core';
import { LoadingController, ModalController } from '@ionic/angular';
import { isValidAddress } from 'algosdk';
import { NewWalletService } from 'src/app/new-wallet.service';
import { ScannerService } from 'src/app/services/scanner.service';
import { SwalHelper } from 'src/app/utils/notification/swal-helper';
import { WalletQuery } from 'src/app/wallet.query';
import { LockscreenPage } from '../lockscreen/lockscreen.page';
import { ScannerPage } from '../scanner/scanner.page';

@Component({
  selector: 'app-wallet-access',
  templateUrl: './wallet-access.page.html',
  styleUrls: ['./wallet-access.page.scss'],
})
export class WalletAccessPage implements OnInit {
  hasCamera: boolean | undefined;
  address: string | undefined;
  error$ = this.walletQuery.selectError();

  constructor(
    private scannerService: ScannerService,
    private modalCtrl: ModalController,
    private walletService: NewWalletService,
    private notification: SwalHelper,
    private walletQuery: WalletQuery,
    private router: Router,
    private loadingCtrl: LoadingController
  ) {}

  ngOnInit() {
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
    const allowed = await this.scannerService.requestPermissions();
    if (allowed) {
      const scanner = await this.modalCtrl.create({
        component: ScannerPage,
      });

      scanner.onWillDismiss().then((result) => {
        // this.address = result;
        //TODO: perform action after scan result
        this.address = result.data;
        scanner.dismiss();
        if (this.address) {
          this.confirm();
        }
      });

      return await scanner.present();
    } else {
      this.notification.swal.fire({
        icon: 'error',
        title: 'Permission required',
        text: `In order to scan a QR Code, you need to grant camera's permission`,
      });
    }
  }

  async confirm() {
    if (!this.isAdressValid()) {
      // TODO: Implement better field validation
      this.notification.swal.fire({
        icon: 'warning',
        title: 'Invalid Address',
        text: 'Please input a valid wallet address',
      });
      return;
    }
    if (this.address) {
      this.address = this.address.trim();
      const pin = await this.presentLock();
      const loading = await this.loadingCtrl.create();
      loading.present();
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
        loading.dismiss();
      }
    }
  }

  async presentLock(): Promise<string> {
    const lock = await this.modalCtrl.create({ component: LockscreenPage });

    const result = lock.onWillDismiss();

    await lock.present();
    console.log(await result);
    return (await result).data?.pin;
  }
}
