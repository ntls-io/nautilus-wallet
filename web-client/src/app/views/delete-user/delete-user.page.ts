import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { faKeyboard, faQrcode } from '@fortawesome/free-solid-svg-icons';
import { ModalController, NavController } from '@ionic/angular';
import { ActionItem } from 'src/app/components/action-item/action-item.component';
import { SessionAlgorandService } from 'src/app/state/session-algorand.service';
import { SessionXrplService } from 'src/app/state/session-xrpl.service';
import { SessionQuery } from 'src/app/state/session.query';
import { SessionService } from 'src/app/state/session.service';
import { SwalHelper } from 'src/app/utils/notification/swal-helper';
import { checkClass } from 'src/helpers/helpers';
import { environment } from '../../../environments/environment';
import { DeleteUserService } from '../../services/delete-user.service';
import { ManualAddressPage } from '../manual-address/manual-address.page';
import { handleScan } from '../scanner.helpers';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.page.html',
  styleUrls: ['./delete-user.page.scss'],
})
export class DeleteUserPage implements OnInit {
  @Input() isPinEntryOpen = false;

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
  ];

  addressForm: UntypedFormGroup;

  hasCamera?: boolean;

  /** @see validatedAddress */
  address?: string;

  tokenSign: string | undefined;

  checkAmountIsZero?: boolean;

  hideXrpBalance = environment.hideXrpBalance;

  constructor(
    private navCtrl: NavController,
    private modalCtrl: ModalController,
    public sessionService: SessionService,
    public sessionQuery: SessionQuery,
    public notification: SwalHelper,
    public sessionAlgorandService: SessionAlgorandService,
    public sessionXrplService: SessionXrplService,
    public deleteUserService: DeleteUserService
  ) {
    this.addressForm = new UntypedFormGroup({
      address: new UntypedFormControl('', [Validators.required, addressValidator]),
    });

    if (environment.hideXrpBalance) {
      this.tokenSign = environment.tokenSymbol;
    } else {
      this.tokenSign = 'XRP';
    }

    this.sessionQuery.allBalances.subscribe((balances) => {
      this.checkAmountIsZero = balances.some(
        (amount) =>
          amount.assetDisplay.assetSymbol === environment.tokenSymbol &&
          amount.amount !== 0
      );
    });
  }

  get validatedAddress(): string | undefined {
    const trimmed = this.address?.trim();
    return trimmed === '' ? undefined : trimmed;
  }

  ngOnInit() {}

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
        UntypedFormControl
      );
      const address = trimmedValue(formControl);
      this.dismiss(true, address);
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

  deleteWalletAccount() {
    this.deleteUserService.deleteWallet(environment.tokenIssuer);
  }
}

const addressValidator = (formGroup: UntypedFormControl) => {
  const address = trimmedValue(formGroup);
  return address ? null : { invalidAddress: true };
};

const trimmedValue = (formControl: UntypedFormControl) => {
  const value = formControl.value;
  if (typeof value === 'string') {
    return value.trim();
  } else {
    throw TypeError(`ManualAddressPage: expected string, got ${typeof value}`);
  }
};

// Customise ActionItem for this page with an 'action' field:

type SendFundsActionItem = ActionItem & { action: ItemAction };
type ItemAction = 'presentScanner' | 'presentAddressModal';
