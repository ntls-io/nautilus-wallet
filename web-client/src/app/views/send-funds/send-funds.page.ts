import { Component, OnInit } from '@angular/core';
import {
  faKeyboard,
  faQrcode,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons';
import {
  AlertController,
  ModalController,
  NavController,
} from '@ionic/angular';
import { isValidAddress } from 'algosdk';
import { ScannerService } from 'src/app/services/scanner.service';
import { SwalHelper } from 'src/app/utils/notification/swal-helper';
import { ManualAddressPage } from '../manual-address/manual-address.page';

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
    {
      label: 'Quick pay',
      title: 'Enter address manually',
      icon: faKeyboard,
      action: 'presentAddressModal',
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
    private alertCtrl: AlertController,
    private notification: SwalHelper,
    private scannerService: ScannerService
  ) {}

  ngOnInit() {}

  async presentScanner() {
    const { data } = await this.scannerService.scannerHandler();
    if (data?.type === 'scanSuccess') {
      if (isValidAddress(data?.result)) {
        await this.navCtrl.navigateForward('pay', {
          queryParams: { receiverAddress: data?.result },
        });
      } else {
        await this.notification.swal.fire({
          icon: 'warning',
          title: 'Invalid Address',
          text: 'Please provide a valid wallet address',
        });
      }
    }
  }

  async presentAddressModal() {
    const modal = await this.modalCtrl.create({ component: ManualAddressPage });

    await modal.present();

    const { data } = await modal.onDidDismiss();
    if (data?.success && data?.address) {
      this.navCtrl.navigateForward('pay', {
        queryParams: { receiverAddress: data?.address },
      });
    }
  }

  execItemAction(action: string | undefined) {
    switch (action) {
      case 'presentScanner':
        this.presentScanner();
        break;
      case 'presentAddressModal':
        this.presentAddressModal();
        break;
      default:
        break;
    }
  }
}
