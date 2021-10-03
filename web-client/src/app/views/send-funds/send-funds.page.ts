import { Component, OnInit } from '@angular/core';
import { faQrcode, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { ModalController, NavController } from '@ionic/angular';
import { SwalHelper } from 'src/app/utils/notification/swal-helper';
import { handleScan } from '../scanner.helpers';

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
    private notification: SwalHelper
  ) {}

  ngOnInit() {}

  async presentScanner() {
    const scanSuccess = async (address: string) => {
      await this.navCtrl.navigateForward('pay', {
        queryParams: { recieverAddress: address },
      });
    };
    await handleScan(this.modalCtrl, this.notification.swal, scanSuccess);
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
