import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faKeyboard, faQrcode } from '@fortawesome/free-solid-svg-icons';
import { ModalController, NavController } from '@ionic/angular';
import { ActionItem } from 'src/app/components/action-item/action-item.component';
import { SwalHelper } from 'src/app/utils/notification/swal-helper';
import { ManualAddressPage } from '../manual-address/manual-address.page';
import { handleScan } from '../scanner.helpers';

@Component({
  selector: 'app-transfer-funds',
  templateUrl: './transfer-funds.page.html',
  styleUrls: ['./transfer-funds.page.scss'],
})
export class TransferFundsPage implements OnInit {
  actionItems: Array<TransferFundsActionItem> = [
    {
      title: 'Scan a QR code',
      icon: faQrcode,
      action: 'presentScanner',
    },
    {
      title: 'Enter address manually',
      icon: faKeyboard,
      action: 'presentAddressModal',
    },
  ];

  transferType: any;

  constructor(
    private router: Router,
    private navCtrl: NavController,
    private modalCtrl: ModalController,
    private notification: SwalHelper
  ) {
    const state = this.router.getCurrentNavigation()?.extras?.state;
    if (state) {
      this.transferType = state?.transferType;
    } else {
      this.navCtrl.navigateRoot('');
    }
  }

  ngOnInit() {}

  async presentScanner() {
    const scanSuccess = async (address: string) => {
      await this.navCtrl.navigateForward(this.transferType, {
        state: { address },
      });
    };
    await handleScan(this.modalCtrl, this.notification.swal, scanSuccess);
  }

  async presentAddressModal() {
    const modal = await this.modalCtrl.create({ component: ManualAddressPage });

    await modal.present();

    const { data } = await modal.onDidDismiss();
    if (data?.success && data?.address) {
      const { address } = data;
      this.navCtrl.navigateForward(this.transferType, {
        state: { address },
      });
    }
  }

  async execItemAction(action: ItemAction): Promise<void> {
    switch (action) {
      case 'presentScanner':
        await this.presentScanner();
        break;
      case 'presentAddressModal':
        await this.presentAddressModal();
        break;
      default:
        break;
    }
  }
}

type TransferFundsActionItem = ActionItem & { action: ItemAction };
type ItemAction = 'presentScanner' | 'presentAddressModal';
