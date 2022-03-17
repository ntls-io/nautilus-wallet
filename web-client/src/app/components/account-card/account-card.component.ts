import { Component, Input, OnInit } from '@angular/core';
import { Account } from 'src/app/stores/account';

@Component({
  selector: 'app-account-card',
  templateUrl: './account-card.component.html',
  styleUrls: ['./account-card.component.scss'],
})
export class AccountCardComponent implements OnInit {
  @Input() account: Account | undefined;

  assets = [
    { name: 'USDC', code: null, balance: '1,000,000' },
    { name: 'Micro-Apple', code: null, balance: '1,000,000' },
  ];

  constructor() {}

  ngOnInit() {}
}
