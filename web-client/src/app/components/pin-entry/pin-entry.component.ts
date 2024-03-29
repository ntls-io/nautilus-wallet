import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { QAccessQuery, QAccessService } from 'src/app/state/qAccess';
import { defined } from 'src/app/utils/errors/panic';
import {
  MaxLengthValidationError,
  MinLengthValidationError,
  PatternValidationError,
  RequiredValidationError,
} from 'src/app/utils/validation.errors';
import { PinResetPage } from 'src/app/views/pin-reset/pin-reset.page';
import { WalletAccessPage } from 'src/app/views/wallet-access/wallet-access.page';
import { environment } from 'src/environments/environment';
import { checkClass } from 'src/helpers/helpers';

@Component({
  selector: 'app-pin-entry',
  templateUrl: './pin-entry.component.html',
  styleUrls: ['./pin-entry.component.scss'],
})
export class PinEntryComponent implements OnInit {
  @Input() wallet_id: string | undefined;

  @Input() titleHeading = 'Enter Pin';

  /** Emit the PIN confirmed by the user. */
  @Output() pinConfirmed = new EventEmitter<PinValue>();

  /** Minimum PIN length. */
  @Input() minLength = 4;

  /** Maximum PIN length. */
  @Input() maxLength = 10;

  /** Optional hook to disable autofocus. */
  @Input() autofocus = true;

  /** Optional hook: set an initial PIN value, if defined. */
  @Input() setInitialPinValue?: string;

  @Input() hideRememberWalletAddress = environment.enableQuickAccess;

  #pinForm?: FormGroup;

  rememberWalletAddress = false;

  walletAddressExists = false;

  hidePinReset = environment.enablePinReset;

  constructor(
    private modalCtrl: ModalController,
    private walletAccessPage: WalletAccessPage,
    private quickAccessService: QAccessService,
    private quickAccessQuery: QAccessQuery
  ) {}

  /** Safe accessor. */
  get pinForm(): FormGroup {
    return defined(
      this.#pinForm,
      'PinEntryComponent.pinForm accessed before ngOnInit'
    );
  }

  /** Safe accessor. */
  get pinControl(): FormControl {
    return checkClass(this.pinForm.controls.pin, FormControl);
  }

  /** Safe accessor. */
  get pinErrors(): PinValidationErrors | null {
    return this.pinControl.dirty && this.pinControl.invalid
      ? (this.pinControl.errors as PinValidationErrors)
      : null;
  }

  onChangeRememberWalletAddress() {
    this.rememberWalletAddress = !this.rememberWalletAddress;
    this.quickAccessService.setRememberWalletAddress(
      this.rememberWalletAddress
    );
  }

  goToPinReset() {
    this.modalCtrl.dismiss({
      dismissed: true,
    });
  }

  ngOnInit(): void {
    this.initForm();
    if (this.walletAccessPage.address) {
      this.walletAddressExists = this.quickAccessQuery.hasEntity(
        this.walletAccessPage.address
      );
    }
  }

  async onSubmit(): Promise<void> {
    const pinForm = defined(this.pinForm);
    pinForm.markAllAsTouched();
    console.log('PinEntryComponent.onSubmit: ', { valid: pinForm.valid });
    if (pinForm.valid) {
      const { pin }: PinFormValue = pinForm.value;
      this.pinConfirmed.emit(pin);
    }
  }

  async goToReset() {
    await this.modalCtrl.dismiss();
    const modal = await this.modalCtrl.create({ component: PinResetPage });

    await modal.present();
  }

  private initForm(): void {
    this.#pinForm = this.createPinForm();
    if (this.setInitialPinValue !== undefined) {
      this.pinControl.setValue(this.setInitialPinValue);
      this.pinControl.markAsDirty();
    }
  }

  private createPinForm(): FormGroup {
    return new FormGroup({
      pin: new FormControl('', {
        validators: [
          Validators.required,
          Validators.minLength(this.minLength),
          Validators.maxLength(this.maxLength),
          Validators.pattern(/^\d*$/),
        ],
      }),
    });
  }
}

type PinFormValue = {
  pin: PinValue;
};

type PinValue = string;

type PinValidationErrors = Partial<
  RequiredValidationError &
    PatternValidationError &
    MinLengthValidationError &
    MaxLengthValidationError
>;
