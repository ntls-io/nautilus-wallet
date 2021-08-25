import { Component, OnInit } from '@angular/core';
import { faLink, faQrcode } from '@fortawesome/free-solid-svg-icons';
import { ModalController } from '@ionic/angular';
import { ScannerService } from 'src/app/services/scanner.service';
import { ScannerPage } from '../scanner/scanner.page';

@Component({
  selector: 'app-send-funds',
  templateUrl: './send-funds.page.html',
  styleUrls: ['./send-funds.page.scss'],
})
export class SendFundsPage implements OnInit {
  actionItems = [
    {
      label: 'Quick pay',
      title: 'Scan a QR code',
      icon: faQrcode,
      action: 'presentScanner',
    },
    {
      label: 'Add New Friend',
      title: 'Share my wallet address',
      icon: faLink,
      disabled: true,
    },
  ];

  constructor(
    private scannerService: ScannerService,
    private modalCtrl: ModalController
  ) {}

  ngOnInit() {}

  async presentScanner() {
    const scanner = await this.modalCtrl.create({
      component: ScannerPage,
    });

    scanner.onWillDismiss().then((result) => {
      console.log(result);
    });

    return await scanner.present();
  }

  execItemAction(action: string | undefined) {
    switch (action) {
      case 'presentScanner':
        this.presentScanner();
        break;

      default:
        break;
    }
  }
}
