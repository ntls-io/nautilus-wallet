import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ZXingScannerComponent } from '@zxing/ngx-scanner';

/** A scan modal result */
export type ScanResult =
  | { type: 'scanSuccess'; result: string }
  | { type: 'scanError'; error: Error }
  | { type: 'camerasNotFound'; error?: DOMException }
  | { type: 'permissionDenied' }
  | { type: 'dismissed' };

/**
 * QR code scanning dialog.
 *
 * Returns the scan result as a {@link ScanResult} via ModalController dismiss.
 */
@Component({
  selector: 'app-scanner',
  templateUrl: './scanner.page.html',
  styleUrls: ['./scanner.page.scss'],
})
export class ScannerPage implements OnInit {
  @ViewChild(ZXingScannerComponent, { static: false })
  scanner!: ZXingScannerComponent;

  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {}

  /** Dismiss the modal, returning the given result. */
  async returnScanResult(scanResult: ScanResult) {
    console.log('ScannerPage returning scan result:', scanResult);
    await this.modalCtrl.dismiss(scanResult);
  }

  async dismissModal() {
    await this.returnScanResult({ type: 'dismissed' });
  }

  // Modal event handlers:

  async scanSuccessHandler(result: string) {
    await this.returnScanResult({ type: 'scanSuccess', result });
  }

  //TODO: handle scan error
  async scanErrorHandler(error: Error) {
    await this.returnScanResult({ type: 'scanError', error });
  }

  // TODO: UI to select device?
  camerasFoundHandler(devices: MediaDeviceInfo[]) {
    console.log('ScannerPage camerasFound:', devices);
  }

  async camerasNotFoundHandler(error?: DOMException) {
    await this.returnScanResult({ type: 'camerasNotFound' });
  }
  async permissionResponseHandler(hasPermission: boolean) {
    console.log('ScannerPage hasPermission:', hasPermission);
    if (!hasPermission) {
      await this.returnScanResult({ type: 'permissionDenied' });
    }
  }
}
