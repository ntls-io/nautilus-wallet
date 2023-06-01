import { Component, OnInit } from '@angular/core';
import {
  faKeyboard,
  faQrcode,
  faSearch,
} from '@fortawesome/free-solid-svg-icons';
import {
  AlertController,
  ModalController,
  NavController,
} from '@ionic/angular';
import { ActionItem } from 'src/app/components/action-item/action-item.component';
import { deviceHasCamera } from 'src/app/utils/camara.helpers';
import { SwalHelper } from 'src/app/utils/notification/swal-helper';
import { ManualAddressPage } from '../manual-address/manual-address.page';
import { handleScan } from '../scanner.helpers';

@Component({
  selector: 'app-send-funds',
  templateUrl: './send-funds.page.html',
  styleUrls: ['./send-funds.page.scss'],
})
export class SendFundsPage implements OnInit {
  actionItems: Array<SendFundsActionItem> = [
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
    // {
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

  async presentScanner() {
    const scanSuccess = async (address: string) => {
      await this.navCtrl.navigateForward('pay', {
        queryParams: { receiverAddress: address },
      });
    };
    await handleScan(this.modalCtrl, this.notification.swal, scanSuccess);
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

type SendFundsActionItem = ActionItem & { action: ItemAction };
type ItemAction =
  | 'presentScanner'
  | 'presentAddressModal'
  | 'presentSearchWallet';
