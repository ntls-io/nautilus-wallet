import { Component, Input, OnInit } from '@angular/core';
import { AssetAmount } from 'src/app/utils/assets/assets.common';

@Component({
  selector: 'app-balance-summary-card',
  templateUrl: './balance-summary-card.component.html',
  styleUrls: ['./balance-summary-card.component.scss'],
})
export class BalanceSummaryCardComponent implements OnInit {
  @Input() balances?: AssetAmount[] | null;
  noBalance = false;

  constructor() {}

  ngOnInit() {}
}
