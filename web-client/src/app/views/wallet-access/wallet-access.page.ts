import { Component, OnInit } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { ModalController } from '@ionic/angular';
import { ScannerService } from 'src/app/services/scanner.service';
import Swal from 'sweetalert2';
import { ScannerPage } from '../scanner/scanner.page';

@Component({
  selector: 'app-wallet-access',
  templateUrl: './wallet-access.page.html',
  styleUrls: ['./wallet-access.page.scss'],
})
export class WalletAccessPage implements OnInit {
  hasCamera: boolean | undefined;

  constructor(
    private scannerService: ScannerService,
    private modalCtrl: ModalController
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
        backdrop: true,
        heightAuto: false,
        allowOutsideClick: false,
      });
    }
  }
}
