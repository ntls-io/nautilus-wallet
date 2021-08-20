import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-print-wallet',
  templateUrl: './print-wallet.page.html',
  styleUrls: ['./print-wallet.page.scss'],
})
export class PrintWalletPage implements OnInit {
  @Input() wallet!: string;

  constructor() {}

  ngOnInit() {}
}
