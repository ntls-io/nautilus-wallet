import { Injectable } from '@angular/core';
import { BarcodeScanner } from '@awesome-cordova-plugins/barcode-scanner/ngx';
import { ModalController, Platform } from '@ionic/angular';
import { ScannerPage } from '../views/scanner/scanner.page';

@Injectable({
  providedIn: 'root',
})
export class ScannerService {
  constructor(
    private modalCtrl: ModalController,
    private platform: Platform,
    private barcodeScanner: BarcodeScanner
  ) {}

  async scannerHandler() {
    if (this.platform.is('capacitor')) {
      return this.nativeScanner();
    } else {
      const scanner = await this.modalCtrl.create({
        component: ScannerPage,
      });

      const dismiss = scanner.onWillDismiss();

      await scanner.present();
      return await dismiss;
    }
  }

  async nativeScanner() {
    const nativeScan = await this.barcodeScanner.scan({
      preferFrontCamera: true,
      showFlipCameraButton: true,
      showTorchButton: true,
      prompt: 'Place a barcode inside the scan area',
      formats: 'QR_CODE',
      disableSuccessBeep: false,
    });

    if (nativeScan.cancelled) {
      return {
        data: {
          type: 'scanCancelled',
        },
      };
    } else {
      return {
        data: {
          type: 'scanSuccess',
          result: nativeScan.text,
        },
      };
    }
  }
}
