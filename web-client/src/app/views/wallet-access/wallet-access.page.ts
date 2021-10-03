import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Capacitor } from '@capacitor/core';
import { ModalController } from '@ionic/angular';
import { isValidAddress } from 'algosdk';
import { ScannerService } from 'src/app/services/scanner.service';
import { WalletService } from 'src/app/services/wallet/wallet.service';
import { SessionQuery } from 'src/app/stores/session/session.query';
import { SwalHelper } from 'src/app/utils/notification/swal-helper';
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
  error$ = this.sessionQuery.selectError();

  constructor(
    private scannerService: ScannerService,
    private modalCtrl: ModalController,
    private walletService: WalletService,
    private notification: SwalHelper,
    private sessionQuery: SessionQuery,
    private router: Router
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
        this.confirm();
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
