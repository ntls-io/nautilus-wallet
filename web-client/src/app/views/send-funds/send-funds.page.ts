import { Component, OnInit } from '@angular/core';
import { faQrcode, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { ModalController, NavController } from '@ionic/angular';
import { ScannerService } from 'src/app/services/scanner.service';
import { SwalHelper } from 'src/app/utils/notification/swal-helper';
import { ScannerPage } from '../scanner/scanner.page';

type ActionItem = {
  label: string;
  title: string;
  icon: IconDefinition;
  action: string;
  disabled?: boolean;
};

@Component({
  selector: 'app-send-funds',
  templateUrl: './send-funds.page.html',
  styleUrls: ['./send-funds.page.scss'],
})
export class SendFundsPage implements OnInit {
  actionItems: Array<ActionItem> = [
    {
      label: 'Quick pay',
      title: 'Scan a QR code',
      icon: faQrcode,
      action: 'presentScanner',
    },
    // {
    //   label: 'Add New Friend',
    //   title: 'Share my wallet address',
    //   icon: faLink,
    //   disabled: true,
    // },
  ];

  constructor(
    private navCtrl: NavController,
    private modalCtrl: ModalController,
    private notification: SwalHelper,
    private scannerService: ScannerService
  ) {}

  ngOnInit() {}

  async presentScanner() {
    const allowed = await this.scannerService.requestPermissions();
    if (allowed) {
      const scanner = await this.modalCtrl.create({
        component: ScannerPage,
      });

      scanner.onWillDismiss().then((result) => {
        console.log(result);
        if (result.data) {
          this.navCtrl.navigateForward('pay', {
            queryParams: { recieverAddress: result.data },
          });
        }
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
