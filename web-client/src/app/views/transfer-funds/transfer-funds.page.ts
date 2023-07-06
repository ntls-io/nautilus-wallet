import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  faKeyboard,
  faQrcode,
  faSearch,
} from '@fortawesome/free-solid-svg-icons';
import { ModalController, NavController } from '@ionic/angular';
import { ActionItem } from 'src/app/components/action-item/action-item.component';
import { SessionQuery } from 'src/app/state/session.query';
import { deviceHasCamera } from 'src/app/utils/camara.helpers';
import { SwalHelper } from 'src/app/utils/notification/swal-helper';
import { addressType } from 'src/app/utils/validators';
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
      showItem: async () => await deviceHasCamera(),
    },
    {
      title: 'Enter address manually',
      icon: faKeyboard,
      action: 'presentAddressModal',
    },
    {
      title: 'Search for a wallet',
      icon: faSearch,
      action: 'presentSearchWallet',
    },
  ];

  transferType: any;

  constructor(
    private router: Router,
    private navCtrl: NavController,
    private modalCtrl: ModalController,
    private notification: SwalHelper,
    private sessionQuery: SessionQuery
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
    const wallet_id = this.sessionQuery.getValue().wallet?.wallet_id;
    let placeholder: string;
    if (this.transferType === 'pay') {
      placeholder = "Enter recipient's address";
    } else {
      placeholder = 'Enter Wallet Address that you are pulling funds from';
    }
    const modal = await this.modalCtrl.create({
      component: ManualAddressPage,
      componentProps: { wallet_id, placeholder },
    });

    await modal.present();

    const { data } = await modal.onDidDismiss();
    if (data?.success && data?.address) {
      const { address } = data;
      if (addressType(address)) {
        this.navCtrl.navigateForward(this.transferType, {
          state: { address },
        });
      } else {
        this.notification.showInvalidAddress();
      }
    }
  }

  async presentSearchWallet() {
    await this.navCtrl.navigateForward('search-wallet');
  }

  async execItemAction(action: ItemAction): Promise<void> {
    switch (action) {
      case 'presentScanner':
        await this.presentScanner();
        break;
      case 'presentAddressModal':
        await this.presentAddressModal();
        break;
      case 'presentSearchWallet':
        await this.presentSearchWallet();
        break;
      default:
        break;
    }
  }
}

// Customise ActionItem for this page with an 'action' field:

type TransferFundsActionItem = ActionItem & { action: ItemAction };
type ItemAction =
  | 'presentScanner'
  | 'presentAddressModal'
  | 'presentSearchWallet';
