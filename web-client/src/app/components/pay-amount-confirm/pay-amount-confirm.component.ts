import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AssetAmount } from 'src/app/utils/asset.display';
import { defined } from 'src/app/utils/errors/panic';

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

  /**
   * Emit the amount confirmed by the user.
   * This will be in the same asset / currency as {@link this.balance}
   */
  @Output() amountConfirmed = new EventEmitter<AssetAmount>();

  constructor() {}

  ngOnInit() {}

  /** Associate the submitted amount with the balance's asset info, and emit. */
  onAmountSubmitted(amount: number): void {
    const assetInfo = defined(
      this.balance?.assetInfo,
      'PayAmountConfirmComponent.onAmountSubmitted: unexpected undefined: this.balance.assetInfo'
    );
    const assetAmount = { amount, assetInfo };
    // TODO: Confirmation dialog?
    this.amountConfirmed.emit(assetAmount);
  }
}
