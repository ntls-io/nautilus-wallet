import { Route } from '@angular/compiler/src/core';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Camera } from '@capacitor/camera';
import { ModalController } from '@ionic/angular';
import { LockscreenPage } from '../views/lockscreen/lockscreen.page';
import { ScannerPage } from '../views/scanner/scanner.page';
import { WalletService } from '../wallet.service';

@Injectable({
  providedIn: 'root',
})
export class ScannerService {
  constructor(
    private modalCtrl: ModalController,
    private walletService: WalletService,
    private router: Router
  ) {}

  async presentWithoutLock(): Promise<string> {
    const modal = await this.modalCtrl.create({
      component: ScannerPage,
    });

    await modal.present();

    const { data } = await modal.onWillDismiss();

    const { success, code } = data;
    return code;
  }

  async presentScanner() {
    const modal = await this.modalCtrl.create({
      component: ScannerPage,
    });

    await modal.present();

    const { data } = await modal.onWillDismiss();

    const { success, code } = data;
    if (success) {
      await this.presentLock(code);
    }
  }

  async presentLock(address: string) {
    const modal = await this.modalCtrl.create({
      component: LockscreenPage,
    });

    modal.present();
    const { data } = await modal.onWillDismiss();

    const { success, code } = data;
    if (success) {
      let res = await this.walletService
        .openWallet({
          auth_pin: code,
          wallet_id: address,
        })
        .toPromise();
      console.log(res);

      if ((res as { Failed: string }).Failed) {
        throw new Error('failed');
      }
      this.walletService.setValue({ sender: res, pin: code });
      this.router.navigate(['/home']);
      //ts-ignore
      // window.test = 'hi';
    }
  }

  async checkPermissions() {
    const { camera } = await Camera.checkPermissions();
    return camera;
  }

  async requestPermissions() {
    //NOTE: https://github.com/ionic-team/capacitor/discussions/4944#discussioncomment-1205023
    try {
      //NOTE: https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia
      const { active } = await navigator.mediaDevices.getUserMedia({
        video: true,
      });
      return active;
    } catch (e) {
      return false;
    }
  }
}
