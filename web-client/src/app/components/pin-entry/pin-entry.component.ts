import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { defined } from 'src/app/utils/errors/panic';
import {
  MaxLengthValidationError,
  MinLengthValidationError,
  PatternValidationError,
  RequiredValidationError,
} from 'src/app/utils/validation.errors';
import { PinResetPage } from 'src/app/views/pin-reset/pin-reset.page';
import { checkClass } from 'src/helpers/helpers';

@Component({
  selector: 'app-pin-entry',
  templateUrl: './pin-entry.component.html',
  styleUrls: ['./pin-entry.component.scss'],
})
export class PinEntryComponent implements OnInit {
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

  #pinForm?: UntypedFormGroup;

  constructor(private modalCtrl: ModalController) {}

  /** Safe accessor. */
  get pinForm(): UntypedFormGroup {
    return defined(
      this.#pinForm,
      'PinEntryComponent.pinForm accessed before ngOnInit'
    );
  }

  /** Safe accessor. */
  get pinControl(): UntypedFormControl {
    return checkClass(this.pinForm.controls.pin, UntypedFormControl);
  }

  /** Safe accessor. */
  get pinErrors(): PinValidationErrors | null {
    return this.pinControl.dirty && this.pinControl.invalid
      ? (this.pinControl.errors as PinValidationErrors)
      : null;
  }

  ngOnInit(): void {
    this.initForm();
  }

  onSubmit(): void {
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

  private createPinForm(): UntypedFormGroup {
    return new UntypedFormGroup({
      pin: new UntypedFormControl('', {
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
