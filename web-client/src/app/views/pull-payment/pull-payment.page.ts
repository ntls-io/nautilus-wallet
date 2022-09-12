import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pull-payment',
  templateUrl: './pull-payment.page.html',
  styleUrls: ['./pull-payment.page.scss'],
})
export class PullPaymentPage implements OnInit {
  walletAddress: string | undefined;

  constructor() {}

  ngOnInit() {}

  scannerResult() {}
}
