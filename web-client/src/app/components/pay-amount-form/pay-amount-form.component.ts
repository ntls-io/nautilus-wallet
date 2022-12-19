import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AssetAmount } from 'src/app/utils/assets/assets.common';
import { defined } from 'src/app/utils/errors/panic';
import {
  MaxValidationError,
  MinValidationError,
  RequiredValidationError,
} from 'src/app/utils/validation.errors';
import {
  NumericValidationError,
  numericValidator,
  parseNumber,
} from 'src/app/utils/validators';
import { checkClass } from 'src/helpers/helpers';

/**
 * Payment amount form: Let the user enter and validate an amount to pay.
 */
@Component({
  selector: 'app-pay-amount-form',
  templateUrl: './pay-amount-form.component.html',
  styleUrls: ['./pay-amount-form.component.scss'],
})
export class PayAmountFormComponent implements OnInit, OnChanges {
  /** A balance held by the current user. */
  @Input() balance?: AssetAmount | null;
  /** Emit the amount submitted by the user. */
  @Output() amountSubmitted = new EventEmitter<number>();

  /** (Optional) Minimum amount to allow. */
  @Input() minAmount?: number = 0;

  /** (Optional) Maximum amount to allow. */
  @Input() maxAmount?: number;

  /** (Optional) Hook to disable autofocus. */
  @Input() autofocus = true;

  /** (Optional) Hook to set an initial amount value, if defined. */
  @Input() setInitialAmountValue?: string;

  @Input() buttonHeading = 'PAY';

  #paymentForm?: FormGroup;

  constructor() {}

  /** Safe accessor. */
  get paymentForm() {
    return defined(
      this.#paymentForm,
      'PayAmountFormComponent.paymentForm accessed before ngOnInit'
    );
  }

  /** Convenience accessor. */
  get amountControl(): FormControl {
    return checkClass(this.paymentForm.controls.amount, FormControl);
  }

  /** Convenience accessor for validation errors, if they should be displayed. */
  get amountErrors(): AmountValidationErrors | null {
    return this.amountControl.dirty && this.amountControl.invalid
      ? (this.amountControl.errors as AmountValidationErrors)
      : null;
  }

  ngOnInit(): void {
    this.#paymentForm = this.initPaymentForm();
    this.setInitialValues();
  }

  /** Recalculate form validity on input min/max amount change. */
  ngOnChanges(changes: SimpleChanges): void {
    if (this.#paymentForm && (changes?.minAmount || changes?.maxAmount)) {
      this.amountControl.updateValueAndValidity();
    }
    if (changes?.balance.previousValue) {
      this.#paymentForm = this.initPaymentForm();
      this.setInitialValues();
    }
  }

  /** Check and emit submission. */
  async onSubmit(): Promise<void> {
    this.paymentForm.markAllAsTouched();
    if (this.paymentForm.valid) {
      const { amount }: PaymentFormValue = this.paymentForm.value;
      this.amountSubmitted.emit(defined(parseNumber(amount)));
    }
  }

  private initPaymentForm(): FormGroup {
    return new FormGroup({
      amount: new FormControl('', [
        Validators.required,
        numericValidator,
        // XXX: Delay evaluation of this.minAmount and this.maxAmount,
        //      to respond to value changes
        (control) =>
          this.minAmount !== undefined
            ? Validators.min(this.minAmount)(control)
            : null,
        (control) =>
          this.maxAmount !== undefined
            ? Validators.max(this.maxAmount)(control)
            : null,
      ]),
    });
  }

  private setInitialValues(): void {
    if (this.setInitialAmountValue !== undefined) {
      this.amountControl.setValue(this.setInitialAmountValue);
      this.amountControl.markAsDirty();
    }
  }
}

/** Type of {@link PayAmountFormComponent.paymentForm}'s values. */
type PaymentFormValue = {
  amount: AmountControlValue;
};

type AmountControlValue = string;

type AmountValidationErrors = Partial<
  RequiredValidationError &
    NumericValidationError &
    MinValidationError &
    MaxValidationError
>;
