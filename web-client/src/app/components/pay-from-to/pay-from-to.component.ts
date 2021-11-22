import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-pay-from-to',
  templateUrl: './pay-from-to.component.html',
  styleUrls: ['./pay-from-to.component.scss'],
})
export class PayFromToComponent implements OnInit {
  @Input() balance!: number | null;
  @Input() receiverAddress!: string | null;
  @Input() name!: string | null;

  constructor() {}

  ngOnInit() {}
}
