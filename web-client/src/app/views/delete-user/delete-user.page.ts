import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { faKeyboard, faQrcode } from '@fortawesome/free-solid-svg-icons';
import { ModalController, NavController } from '@ionic/angular';
import { ActionItem } from 'src/app/components/action-item/action-item.component';
import { PaymentOption } from 'src/app/components/pay/pay.component';
import { SessionAlgorandService } from 'src/app/state/session-algorand.service';
import { SessionXrplService } from 'src/app/state/session-xrpl.service';
import { SessionQuery } from 'src/app/state/session.query';
import { SessionService } from 'src/app/state/session.service';
import { SwalHelper } from 'src/app/utils/notification/swal-helper';
import { checkClass } from 'src/helpers/helpers';
import { environment } from '../../../environments/environment';
import { PurePayPageComponent } from '../../components/pure-pay-page/pure-pay-page.component';
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

  addressForm: FormGroup;

  hasCamera?: boolean;

  /** @see validatedAddress */
  address?: string;

  hideXrpBalance = environment.hideXrpBalance;

  tokenIssuer = environment.tokenIssuer;

  tokenSign: string | undefined;

  /** A balance held by the current user. */
  balances = this.sessionQuery.allBalances;

  paymentOptions?: PaymentOption[];

  checkAmountIsZero?: boolean;

  constructor(
    private navCtrl: NavController,
    private modalCtrl: ModalController,
    public sessionService: SessionService,
    public sessionQuery: SessionQuery,
    public notification: SwalHelper,
    public sessionAlgorandService: SessionAlgorandService,
    public sessionXrplService: SessionXrplService,
    public deleteUserSrvice: DeleteUserService,
    public purePayPageComponent: PurePayPageComponent
  ) {
    this.addressForm = new FormGroup({
      address: new FormControl('', [Validators.required, addressValidator]),
    });

    if (this.hideXrpBalance) {
      this.tokenSign = environment.tokenCurrency;
    } else {
      this.tokenSign = 'XRP';
    }

    this.sessionQuery.allBalances.subscribe((balances) => {
      this.checkAmountIsZero = balances.some(
        (amount) =>
          amount.assetDisplay.assetSymbol === 'FOO' && amount.amount !== 0
      );
      console.log(this.checkAmountIsZero);
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
        FormControl
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
    this.deleteUserSrvice.deleteWallet(this.tokenIssuer);
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
type ItemAction = 'presentScanner' | 'presentAddressModal';
