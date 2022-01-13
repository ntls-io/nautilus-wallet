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
  @ViewChild('scanner') scanner: ZXingScannerComponent =
    new ZXingScannerComponent();

  availableDevices: MediaDeviceInfo[] = [];
  deviceCurrent: MediaDeviceInfo | undefined;
  hasDevices: boolean | undefined;
  cameraReady = false;

  constructor(private modalCtrl: ModalController) {}

  async ngOnInit() {}

  async dismissModal() {
    await this.modalCtrl.dismiss();
  }

  async scanSuccessHandler(result: string) {
    await this.modalCtrl.dismiss({ type: 'scanSuccess', result });
  }

  //TODO: handle scan error
  async scanErrorHandler(error: Error) {
    await this.modalCtrl.dismiss({ type: 'scanError', error });
  }

  camerasFoundHandler(devices: MediaDeviceInfo[]) {
    console.log('ScannerPage camerasFound:', devices);
    this.availableDevices = devices;
    this.cameraReady = Boolean(devices.length);
    this.hasDevices = Boolean(devices.length > 1);
  }

  async camerasNotFoundHandler(error?: DOMException) {
    await this.modalCtrl.dismiss({ type: 'camerasNotFound' });
  }

  async permissionResponseHandler(hasPermission: boolean) {
    console.log('ScannerPage hasPermission:', hasPermission);
    if (!hasPermission) {
      await this.modalCtrl.dismiss({ type: 'permissionDenied' });
    }
  }

  switchCamera() {
    this.deviceCurrent = this.availableDevices.find(
      (device) => device.deviceId !== this.deviceCurrent?.deviceId
    );
  }
}
