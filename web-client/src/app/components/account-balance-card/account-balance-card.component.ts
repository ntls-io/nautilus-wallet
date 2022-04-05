import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-account-balance-card',
  templateUrl: './account-balance-card.component.html',
  styleUrls: ['./account-balance-card.component.scss'],
})
export class AccountBalanceCardComponent implements OnInit {
  @Input() balance: number | undefined;
  @Input() currency: string | undefined;
  @Input() account = false;
  @Output() showAddress = new EventEmitter<any>();
  @Output() payToAddress = new EventEmitter<any>();

  constructor() {}

  ngOnInit() {}

  pay() {
    this.payToAddress.emit();
  }

  receive() {
    this.showAddress.emit();
  }
}
