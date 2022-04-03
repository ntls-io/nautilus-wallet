import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ID } from '@datorama/akita';
import { Account } from 'src/app/stores/account';

@Component({
  selector: 'app-account-card',
  templateUrl: './account-card.component.html',
  styleUrls: ['./account-card.component.scss'],
})
export class AccountCardComponent implements OnInit {
  @Input() account!: Account;
  @Output() selectedAccount = new EventEmitter<ID>();

  assets = [
    { name: 'USDC', code: null, balance: '1,000,000' },
    { name: 'Micro-Apple', code: null, balance: '1,000,000' },
  ];

  constructor() {}

  ngOnInit() {}

  selectAccount(walletId: ID) {
    this.selectedAccount.emit(walletId);
  }
}