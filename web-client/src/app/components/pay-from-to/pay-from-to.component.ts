import { Component, Input, OnInit } from '@angular/core';
import { AssetAmount } from 'src/app/utils/asset.display';

@Component({
  selector: 'app-pay-from-to',
  templateUrl: './pay-from-to.component.html',
  styleUrls: ['./pay-from-to.component.scss'],
})
export class PayFromToComponent implements OnInit {
  // XXX(Pi): Add null to type for async pipe. See: <https://github.com/angular/angular/issues/43727>

  @Input() balance?: AssetAmount | null;
  @Input() receiverAddress?: string | null;
  @Input() name?: string | null;

  constructor() {}

  ngOnInit() {}
}
