import { Component, OnInit, Input } from '@angular/core';
import { AssetAmount } from 'src/app/utils/assets/assets.common';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { checkClass } from 'src/helpers/helpers';
import { withLoadingOverlayOpts } from 'src/app/utils/loading.helpers';
import { LoadingController, ToastController } from '@ionic/angular';
import { SessionService } from 'src/app/state/session.service';
import { SessionAlgorandService } from 'src/app/state/session-algorand.service';
import { SessionXrplService } from 'src/app/state/session-xrpl.service';
import { checkTxResponseSucceeded } from 'src/app/services/xrpl.utils';
import {
  withConsoleGroup,
  withConsoleGroupCollapsed,
} from 'src/app/utils/console.helpers';
import { SwalHelper } from 'src/app/utils/notification/swal-helper';
import { SessionQuery } from 'src/app/state/session.query';
import { Observable } from 'rxjs';
import { handleScan } from '../scanner.helpers';
import { ActionItem } from 'src/app/components/action-item/action-item.component';
import { faKeyboard, faQrcode } from '@fortawesome/free-solid-svg-icons';
import {
  AlertController,
  ModalController,
  NavController,
} from '@ionic/angular';
import { ManualAddressPage } from '../manual-address/manual-address.page';



@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.page.html',
  styleUrls: ['./delete-user.page.scss'],
})
export class DeleteUserPage implements OnInit {

  actionItems: Array<SendFundsActionItem> = [
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
    // {
    //   title: 'Share my wallet address',
    //   icon: faLink,
    //   disabled: true,
    // },
  ];

  addressForm: FormGroup;

  /** Active wallet's balances. */
  balances: Observable<AssetAmount[]> = this.sessionQuery.allBalances;

  @Input() isPinEntryOpen = false;

  /** True if balances are in the process of being updated */
  @Input() balancesIsLoading = false;

  hasCamera?: boolean;

  /** @see validatedAddress */
  address?: string;

  constructor(
    private navCtrl: NavController,
    private modalCtrl: ModalController,
    private loadingController: LoadingController,
    public sessionService: SessionService,
    public sessionQuery: SessionQuery,
    public notification: SwalHelper,
    public sessionAlgorandService: SessionAlgorandService,
    public sessionXrplService: SessionXrplService
    ) {
    this.addressForm = new FormGroup({
      address: new FormControl('', [Validators.required, addressValidator]),
    });
   }

   async ngOnInit(): Promise<void> {
    await this.refreshWalletData();
  }

  get validatedAddress(): string | undefined {
    const trimmed = this.address?.trim();
    return trimmed === '' ? undefined : trimmed;
  }

  async openScanner(): Promise<void> {
    await handleScan(
      this.modalCtrl,
      this.notification.swal,
      this.confirmAddress
    );
  }

  /** User clicked to confirm address: show PIN entry. */
  async confirmAddress(): Promise<void> {
    if (this.validatedAddress !== undefined) {
      this.showPinEntryModal();
    } else {
      await this.notification.swal.fire({
        icon: 'warning',
        title: 'Invalid Address',
        text: 'Please input a valid wallet address',
      });
    }
  }

  /** Show the PIN entry modal. */
  showPinEntryModal(): void {
    this.isPinEntryOpen = true;
  }

  dismiss(success: boolean, address?: string) {
    this.modalCtrl.dismiss({
      success,
      address,
    });
  }

  onSubmit() {
    this.addressForm.markAllAsTouched();
    if (this.addressForm.valid) {
      const formControl = checkClass(
        this.addressForm.controls.address,
        FormControl
      );
      const address = trimmedValue(formControl);
      this.dismiss(true, address);
    }
  }

  async onRefresh(): Promise<void> {
    await withLoadingOverlayOpts(
      this.loadingController,
      { message: 'Refreshing…' },
      async () => await this.refreshWalletData()
    );
  }

  async refreshWalletData(): Promise<void> {
    this.balancesIsLoading = true;
    try {
      await withConsoleGroup('WalletPage.refreshWalletData:', async () => {
        await withConsoleGroupCollapsed('Loading wallet data', async () => {
          await Promise.all([
            (async () => {
              await this.sessionAlgorandService.loadAccountData();
              await this.sessionAlgorandService.loadAssetParams();
            })(),
            this.sessionXrplService.loadAccountData(),
            this.sessionService.loadOnfidoCheck(),
          ]);
        });
        await withConsoleGroupCollapsed(
          'Checking asset / token opt-ins',
          async () => {
            //await this.checkAlgorandAssetOptIn(); TODO
            await this.checkXrplTokenOptIns();
          }
        );
        console.log('Done.');
      });
    } finally {
      this.balancesIsLoading = false;
    }
  }

  protected async checkXrplTokenOptIns(): Promise<void> {
    if (this.sessionQuery.hasXrpBalance()) {
      const txResponses = await this.sessionXrplService.checkTrustlineOptIns();
      const unsuccessfulResponses = txResponses.filter((txResponse) => {
        const { succeeded } = checkTxResponseSucceeded(txResponse);
        return !succeeded;
      });
      if (0 < unsuccessfulResponses.length) {
        console.log(
          'DekewteUserPage.checkXrplTokenOptIns: unsuccessful responses:',
          { unsuccessfulResponses }
        );
        const errorMessage: string = unsuccessfulResponses
          .map((txResponse) => {
            const { resultCode } = checkTxResponseSucceeded(txResponse);
            return resultCode;
          })
          .join('\n');
        await this.errorNotification('XRPL token opt-in failed', errorMessage);
      }
    }
  }

  protected async errorNotification(
    titleText: string,
    err: any
  ): Promise<void> {
    const text = err?.response?.body?.message ?? err?.response?.body ?? err;
    console.error('UserDeletePage.withAlertErrors caught', { err });
    await this.notification.swal.fire({
      icon: 'error',
      titleText,
      text,
    });
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

  async presentScanner() {
    const scanSuccess = async (address: string) => {
      await this.navCtrl.navigateForward('deposit-funds', {
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
      this.navCtrl.navigateForward('deposit-funds', {
        queryParams: { receiverAddress: data?.address },
      });
    }
  }

}

const addressValidator = (formGroup: FormControl) => {
  const address = trimmedValue(formGroup);
  return address ? null : { invalidAddress: true };
};

const trimmedValue = (formControl: FormControl) => {
  const value = formControl.value;
  if (typeof value === 'string') {
    return value.trim();
  } else {
    throw TypeError(`ManualAddressPage: expected string, got ${typeof value}`);
  }
};

// Customise ActionItem for this page with an 'action' field:

type SendFundsActionItem = ActionItem & { action: ItemAction };
type ItemAction = 'presentScanner' | 'presentAddressModal'
