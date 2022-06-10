import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import {
  AssetAmount,
  assetAmountFromBase,
} from 'src/app/utils/assets/assets.common';

@Component({
  selector: 'app-transaction-fees',
  templateUrl: './transaction-fees.component.html',
  styleUrls: ['./transaction-fees.component.scss'],
})
export class TransactionFeesComponent implements OnChanges {
  /** A balance held by the current user. */
  @Input() balance!: AssetAmount;
  @Input() transactionAmount = 0;
  assetAmount!: AssetAmount;

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    const amount = changes?.transactionAmount?.currentValue ?? 0;

    this.assetAmount = assetAmountFromBase(amount, this.balance);
  }
}
