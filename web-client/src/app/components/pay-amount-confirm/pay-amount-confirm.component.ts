import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  AssetAmount,
  assetAmountFromBase,
} from 'src/app/utils/assets/assets.common';
import { defined } from 'src/app/utils/errors/panic';
import { ifDefined } from 'src/helpers/helpers';

/**
 * Show a summary of a user balance and recipient address,
 * and capture an amount to pay to the recipient.
 *
 * This combines {@link PayFromToComponent} and {@link PayAmountFormComponent}.
 */
@Component({
  selector: 'app-pay-amount-confirm',
  templateUrl: './pay-amount-confirm.component.html',
  styleUrls: ['./pay-amount-confirm.component.scss'],
})
export class PayAmountConfirmComponent implements OnInit {
  /** The current user's name. */
  @Input() name?: string | null;

  /** A balance held by the current user. */
  @Input() balance?: AssetAmount | null;

  /** The address to receive the payment. */
  @Input() receiverAddress?: string | null;

  /** (Optional) A limit to impose on the transaction amount. */
  @Input() transactionLimit?: number | null;

  /**
   * Emit the amount confirmed by the user.
   * This will be in the same asset / currency as {@link this.balance}
   */
  @Output() amountConfirmed = new EventEmitter<AssetAmount>();

  /** @see PayAmountFormComponent.autofocus */
  @Input() autofocus = true;

  /** @see PayAmountFormComponent.setInitialAmountValue */
  @Input() setInitialAmountValue?: string;

  constructor() {}

  /** Limit the available balance by the transaction limit, if defined. */
  get maxAmount() {
    return ifDefined(this.balance, (balance) =>
      this.transactionLimit !== undefined && this.transactionLimit !== null
        ? Math.min(balance.amount, this.transactionLimit)
        : balance.amount
    );
  }

  ngOnInit() {}

  /** Associate the submitted amount with the balance's asset info, and emit. */
  onAmountSubmitted(amount: number): void {
    const balance = defined(
      this.balance ?? undefined,
      'PayAmountConfirmComponent.onAmountSubmitted: unexpected undefined: this.balance'
    );
    const assetAmount: AssetAmount = assetAmountFromBase(amount, balance);
    // TODO: Confirmation dialog?
    this.amountConfirmed.emit(assetAmount);
  }
}
