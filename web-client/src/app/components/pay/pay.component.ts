import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AssetAmount } from 'src/app/utils/assets/assets.common';
import { defined } from 'src/app/utils/errors/panic';

/**
 * Let user define a payment, from one or more payment options.
 *
 * This handles account selection, and uses {@link PayAmountConfirmComponent}
 * for amount selection
 */
@Component({
  selector: 'app-pay',
  templateUrl: './pay.component.html',
  styleUrls: ['./pay.component.scss'],
})
export class PayComponent implements OnInit {
  /** The available payment options. */
  @Input() paymentOptions?: ReadonlyArray<PaymentOption>;

  /** Emit the payment submitted by the user. */
  @Output() paymentSubmitted = new EventEmitter<Payment>();

  selectedOption?: PaymentOption;

  constructor() {}

  /** "Change account" button should show for multiple options. */
  get shouldShowChangeButton(): boolean {
    return this.paymentOptions !== undefined && 1 < this.paymentOptions.length;
  }

  ngOnInit(): void {
    this.initSelectedOption();
  }

  /** Emit user-confirmed amount as payment. */
  onAmountConfirmed(amount: AssetAmount): void {
    const option = defined(
      this.selectedOption,
      'PayComponent.onAmountConfirmed: unexpected undefined: selectedOption'
    );
    this.paymentSubmitted.emit({ amount, option });
  }

  private initSelectedOption(): void {
    if (this.paymentOptions !== undefined && 0 < this.paymentOptions.length) {
      this.selectedOption = this.paymentOptions[0];
    }
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
};

/** A payment chosen by the user. */
export type Payment = {
  amount: AssetAmount;
  option: PaymentOption;
};
