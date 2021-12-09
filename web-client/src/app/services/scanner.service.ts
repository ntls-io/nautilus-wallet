import { Injectable } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ScannerPage } from '../views/scanner/scanner.page';

@Injectable({
  providedIn: 'root',
})
export class ScannerService {
  constructor(private modalCtrl: ModalController) {}

  async scannerHandler() {
    const scanner = await this.modalCtrl.create({
      component: ScannerPage,
    });

    const dismiss = scanner.onWillDismiss();

    await scanner.present();
    return await dismiss;
  }
}
