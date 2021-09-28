import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Capacitor } from '@capacitor/core';
import { LoadingController, ModalController } from '@ionic/angular';
import { isValidAddress } from 'algosdk';
import { never, NewWalletService } from 'src/app/new-wallet.service';
import { ScannerService } from 'src/app/services/scanner.service';
import { SwalHelper } from 'src/app/utils/notification/swal-helper';
import { WalletQuery } from 'src/app/wallet.query';
import { LockscreenPage } from '../lockscreen/lockscreen.page';
import { ScannerPage, ScanResult } from '../scanner/scanner.page';

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
    // XXX: Capacitor.isPluginAvailable('Camera') depends on ScannerService, as a side effect.
    private scannerService: ScannerService,
    private modalCtrl: ModalController,
    private walletService: NewWalletService,
    private notification: SwalHelper,
    private walletQuery: WalletQuery,
    private router: Router,
    private loadingCtrl: LoadingController
  ) {}

  ngOnInit() {
    // XXX: Capacitor.isPluginAvailable('Camera') depends on ScannerService, as a side effect.
    this.hasCamera = Capacitor.isPluginAvailable('Camera');
  }

  // FIXME: Duplication with SendFundsPage.presentScanner
  async openScanner() {
    const scanSuccess = async (address: string) => {
      await this.confirm(address);
    };

    // FIXME: fix import for OverlayEventDetail
    const dismissed = async (eventDetail: { data?: ScanResult }) => {
      const { data: result } = eventDetail;
      switch (result?.type) {
        case 'scanSuccess':
          await scanSuccess(result.result);
          break;
        case 'scanError':
          await this.notification.swal.fire({
            icon: 'error',
            title: 'Error scanning QR code',
            text: 'Failed to scan a valid QR code. Please try again.',
          });
          break;
        case 'camerasNotFound':
          await this.notification.swal.fire({
            icon: 'warning',
            title: 'No camera found',
            text: 'In order to scan a QR Code, your device must have a camera',
          });
          break;
        case 'permissionDenied':
          await this.notification.swal.fire({
            icon: 'error',
            title: 'Permission required',
            text: `In order to scan a QR Code, you need to grant camera's permission`,
          });
          break;
        case 'dismissed':
          // Explicit user dismiss: just return silently.
          break;
        case undefined:
          throw Error(
            'ScannerPage modal dismiss returned unexpected undefined!'
          );
        default:
          never(result);
      }
    };

    // Show modal
    const scanner = await this.modalCtrl.create({ component: ScannerPage });
    const didDismissPromise = scanner.onDidDismiss();

    await scanner.present();
    await dismissed(await didDismissPromise);
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
