import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { AssetAmount } from 'src/app/utils/assets/assets.common';

@Component({
  selector: 'app-balance-summary-card',
  templateUrl: './balance-summary-card.component.html',
  styleUrls: ['./balance-summary-card.component.scss'],
})
export class BalanceSummaryCardComponent implements OnInit, OnChanges {
  @Input() balances?: AssetAmount[] | null;
  @Input() isLoading = false;
  showAsset = false;

  constructor() {}

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges): void {
    this.showAsset = changes?.balances?.currentValue?.some(
      (e: AssetAmount) => e?.assetDisplay.assetSymbol === 'FOO'
    );
  }
}
