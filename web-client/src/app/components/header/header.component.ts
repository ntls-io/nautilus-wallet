import { Component, Input, OnInit } from '@angular/core';
import { WalletQuery } from 'src/app/wallet.query';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() title = 'NAUTILUS';
  constructor(public walletQuery: WalletQuery) {}

  ngOnInit() {}
}
