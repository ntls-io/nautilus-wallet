import { Injectable } from '@angular/core';
import { Camera } from '@capacitor/camera';
import { ModalController } from '@ionic/angular';
import { ScannerPage } from '../views/scanner/scanner.page';

@Injectable({
  providedIn: 'root',
})
export class ScannerService {
  constructor(private modalCtrl: ModalController) {}

  async presentScanner() {
    const modal = await this.modalCtrl.create({
      component: ScannerPage,
    });
    return await modal.present();
  }

  async checkPermissions() {
    const { camera } = await Camera.checkPermissions();
    return camera;
  }

  async requestPermissions() {
    try {
      const { active } = await navigator.mediaDevices.getUserMedia({
        video: true,
      });
      return active;
    } catch (e) {
      console.log(e);
      return false;
    }
  }
}
