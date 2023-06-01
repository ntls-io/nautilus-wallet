import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonInput, LoadingController } from '@ionic/angular';
import { OtpPromptService } from 'src/app/services/otp-prompt.service';
import { OtpLimitsService } from 'src/app/state/otpLimits';
import {
  OtpRecipientsQuery,
  OtpRecipientsService,
} from 'src/app/state/otpRecipients';
import { SessionQuery } from 'src/app/state/session.query';
import { AssetAmount } from 'src/app/utils/assets/assets.common';
import { withLoadingOverlayOpts } from 'src/app/utils/loading.helpers';
import { SwalHelper } from 'src/app/utils/notification/swal-helper';
import { environment } from 'src/environments/environment';
import algosdk from 'algosdk';
import * as xrpl from 'xrpl';

@Component({
  selector: 'app-triggers',
  templateUrl: './triggers.page.html',
  styleUrls: ['./triggers.page.scss'],
})
export class TriggersPage implements OnInit {
  /** The available payment options. */
  @Input() paymentOptions?: AssetAmount[];

  selectTabs = 'limits';
  otpRecipientForm: FormGroup;
  selectedOption?: AssetAmount;
  limit!: number;

  constructor(
    public otpRecipientsQuery: OtpRecipientsQuery,
    private notification: SwalHelper,
    private formBuilder: FormBuilder,
    private loadingCtrl: LoadingController,
    private otpPromptService: OtpPromptService,
    private otpLimitsService: OtpLimitsService,
    private otpRecipientsService: OtpRecipientsService,
    private sessionQuery: SessionQuery
  ) {
    this.otpRecipientForm = this.formBuilder.group({
      otpRecipient: [
        '',
        Validators.compose([Validators.minLength(2), Validators.required]),
      ],
    });
  }

  /** "Change account" button should show for multiple options. */
  get shouldShowChangeButton(): boolean {
    return this.paymentOptions !== undefined && this.paymentOptions.length > 1;
  }

  ngOnInit() {
    this.sessionQuery.allBalances.subscribe((balances: AssetAmount[]) => {
      // 'balances' is now of type 'AssetAmount[]'
      this.paymentOptions = balances;
      if (environment.hideXrpBalance) {
        this.paymentOptions = balances.filter(
          (balance) => balance.assetDisplay.assetSymbol !== 'XRP'
        );
      }
    });
    this.initSelectedOption();
  }

  async ionViewWillEnter() {
    await this.otpLimitsService.getOtpLimits();
    await this.otpRecipientsService.getOtpRecipients();
  }

  async saveLimits(limitInput: IonInput) {
    const currencyCode = this.selectedOption?.assetDisplay.assetSymbol || '';
    await this.otpLimitsService.setOtpLimit({
      currency_code: currencyCode,
      limit: this.limit,
    });

    limitInput.value = null;
  }

  /** Validated {@link address}, or `undefined`. */
  validatedAddress(address: string): string {
    const trimmed = address?.trim();
    return trimmed === '' ? '' : trimmed;
  }

  validAddressType(address: string): AddressType | undefined {
    return this.validatedAddress(address)
      ? addressType(this.validatedAddress(address))
      : undefined;
  }

  async createOtpRecipient(form: FormGroup) {
    form.markAllAsTouched();
    if (form.valid) {
      const otpRecipient = form.value.otpRecipient;
      if(this.validatedAddress(otpRecipient) !== '' &&
        this.validAddressType(otpRecipient)){
          await this.otpRecipientsService
        .createOtpRecipient(otpRecipient)
        .then((success) => {
          if (success) {
            form.reset();
          }
        });
      } else {
        await this.notification.swal.fire({
          icon: 'warning',
          title: 'Invalid Address',
          text: 'Please input a valid wallet address',
        });
      }
    }
  }

  async deleteOtpRecipient(id: string) {
    const confirmation = await this.showDeleteConfirmation();

    if (!confirmation) {
      return;
    }

    const otpAttempt = await this.otpPromptService.requestOTP();
    if (!otpAttempt) {
      return;
    }

    await withLoadingOverlayOpts(
      this.loadingCtrl,
      { message: 'Checking OTP...' },
      async () => {
        const otpResult = await this.otpPromptService.checkOtp(otpAttempt);
        if (otpResult.status === 200) {
          if (otpResult.data.status === 'approved') {
            await withLoadingOverlayOpts(
              this.loadingCtrl,
              { message: 'Deleting Wallet Address' },
              () => this.deleteRecipient(id)
            );
          } else if (otpResult.data.status === 'pending') {
            this.notification.showIncorrectOTPWarning();
          }
        } else {
          this.notification.showUnexpectedFailureWarning();
        }
      }
    );
  }

  private initSelectedOption(): void {
    if (this.paymentOptions !== undefined && this.paymentOptions.length === 1) {
      this.selectedOption = this.paymentOptions[0];
    }
  }

  private async showDeleteConfirmation(): Promise<boolean> {
    const confirmation = await this.notification.swal.fire({
      icon: 'warning',
      titleText: 'Delete OTP recipient',
      text: 'Are you sure you want to delete this Wallet Address?',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      showLoaderOnConfirm: true,
      confirmButtonColor: 'var(--ion-color-primary)',
      cancelButtonColor: 'var(--ion-color-medium)',
      reverseButtons: true,
    });

    return confirmation.isConfirmed;
  }

  private async deleteRecipient(id: string): Promise<void> {
    await withLoadingOverlayOpts(
      this.loadingCtrl,
      { message: 'Deleting Wallet Address...' },
      async () => await this.otpRecipientsService.deleteOtpRecipient(id)
    );
  }
}

/**
 * A payment option, defined as a pair of sending and receiving account.
 */
export type PaymentOption = {
  /** The sending account's name. */
  senderName: string;

  /** The sending account's balance. */
  senderBalance: AssetAmount;

  /** The receiving account's address. */
  receiverAddress: string;

  /** (Optional) A transaction amount limit for this option. */
  transactionLimit?: number;
};

type AddressType = 'Algorand' | 'XRPL';

const addressTypes = (address: string): AddressType[] => {
  const coerce = (t: AddressType[]) => t;
  return [
    ...coerce(algosdk.isValidAddress(address) ? ['Algorand'] : []),
    ...coerce(xrpl.isValidAddress(address) ? ['XRPL'] : []),
  ];
};

const addressType = (address: string): AddressType | undefined => {
  const types = addressTypes(address);
  switch (types.length) {
    case 0:
      return undefined;
    case 1:
      return types[0];
    default:
      throw Error(
        `addressType: ${JSON.stringify(
          types
        )} has multiple types: ${JSON.stringify(types)}`
      );
  }
};
