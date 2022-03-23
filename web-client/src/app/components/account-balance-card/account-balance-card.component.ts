import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-account-balance-card',
  templateUrl: './account-balance-card.component.html',
  styleUrls: ['./account-balance-card.component.scss'],
})
export class AccountBalanceCardComponent implements OnInit {
  @Input() balance: number | undefined;
  @Input() currency: string | undefined;
  @Input() account = false;

  constructor() {}

  ngOnInit() {}
}
