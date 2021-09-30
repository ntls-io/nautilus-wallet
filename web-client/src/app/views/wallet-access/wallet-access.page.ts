import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Capacitor } from '@capacitor/core';
import { LoadingController, ModalController } from '@ionic/angular';
import { isValidAddress } from 'algosdk';
import { never, WalletService } from 'src/app/services/wallet';
import { SessionQuery } from 'src/app/stores/session';
import { SwalHelper } from 'src/app/utils/notification/swal-helper';
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

  isAdressValid(): boolean {
    if (this.address) {
      return isValidAddress(this.address);
    } else {
      return false;
    }
  }

  // FIXME: Duplication with SendFundsPage.presentScanner
  async openScanner() {
    const scanSuccess = async (address: string) => {
      this.address = address;
      await this.confirm();
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
      const pinPromise = this.presentLock();
      const loading = await this.loadingCtrl.create();
      const pin = await pinPromise;
      if (!pin) {
        return;
      }
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
