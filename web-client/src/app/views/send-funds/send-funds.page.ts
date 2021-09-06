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
import { SwalHelper } from 'src/app/utils/notification/swal-helper';
import { never } from '../../new-wallet.service';
import { ManualAddressPage } from '../manual-address/manual-address.page';
import { ScannerPage, ScanResult } from '../scanner/scanner.page';

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
    private notification: SwalHelper
  ) {}

  ngOnInit() {}

  // FIXME: Duplication with WalletAccessPage.openScanner
  async presentScanner() {
    const scanSuccess = async (address: string) => {
      await this.navCtrl.navigateForward('pay', {
        queryParams: { receiverAddress: address },
      });
    };

    // FIXME: fix import for OverlayEventDetail
    const dismissed = async (eventDetail: { data?: ScanResult }) => {
      const { data: result } = eventDetail;
      switch (result?.type) {
        case 'scanSuccess':
          await scanSuccess(result.result);
          break;
        case 'scanError':
          await this.notification.swal.fire({
            icon: 'error',
            title: 'Error scanning QR code',
            text: 'Failed to scan a valid QR code. Please try again.',
          });
          break;
        case 'camerasNotFound':
          await this.notification.swal.fire({
            icon: 'warning',
            title: 'No camera found',
            text: 'In order to scan a QR Code, your device must have a camera',
          });
          break;
        case 'permissionDenied':
          await this.notification.swal.fire({
            icon: 'error',
            title: 'Permission required',
            text: `In order to scan a QR Code, you need to grant camera's permission`,
          });
          break;
        case 'dismissed':
          // Explicit user dismiss: just return silently.
          break;
        case undefined:
          throw Error(
            'ScannerPage modal dismiss returned unexpected undefined!'
          );
        default:
          never(result);
      }
    };

    // Show modal
    const scanner = await this.modalCtrl.create({ component: ScannerPage });
    const didDismissPromise = scanner.onDidDismiss();

    await scanner.present();
    await dismissed(await didDismissPromise);
  }

  async presentAddressModal() {
    const modal = await this.modalCtrl.create({ component: ManualAddressPage });

    await modal.present();

    const { data } = await modal.onDidDismiss();
    if (data?.success && data?.address) {
      await this.navCtrl.navigateForward('pay', {
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
