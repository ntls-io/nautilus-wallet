import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Capacitor } from '@capacitor/core';
import { ModalController } from '@ionic/angular';
import { NewWalletService } from 'src/app/new-wallet.service';
import { ScannerService } from 'src/app/services/scanner.service';
import Swal from 'sweetalert2';
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

  constructor(
    private scannerService: ScannerService,
    private modalCtrl: ModalController,
    private walletService: NewWalletService,
    private router: Router
  ) {}

  ngOnInit() {
    this.hasCamera = Capacitor.isPluginAvailable('Camera');
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
        console.log(result);
      });

      return await scanner.present();
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Permission required',
        text: `In order to scan a QR Code, you need to grant camera's permission`,
        confirmButtonColor: 'var(--ion-color-primary)',
        customClass: {
          title: 'font-nasalization',
        },
        backdrop: true,
        heightAuto: false,
        allowOutsideClick: false,
      });
    }
  }

  async confirm() {
    if (this.address) {
      this.address = this.address.trim();
      let pin = await this.presentLock();

      await this.walletService.openWallet(this.address, pin);
      this.router.navigate(['/wallet']);

      // this.scannerService.presentLock(this.address);
    }
  }

  async presentLock(): Promise<string> {
    let lock = await this.modalCtrl.create({ component: LockscreenPage });

    let result = lock.onWillDismiss();

    await lock.present();
    console.log(await result);
    return (await result).data!.pin;
  }
}
