import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { firstValueFrom } from 'rxjs';
import { SessionQuery } from 'src/app/state/session.query';
import {
  AssetAmount,
  assetAmountFromBase,
} from 'src/app/utils/assets/assets.common';

@Component({
  selector: 'app-pull',
  templateUrl: './pull.page.html',
  styleUrls: ['./pull.page.scss'],
})
export class PullPage implements OnInit {
  senderAddress: string | undefined;
  selectedCurrency = 'XRP';

  balanceLimit: AssetAmount | undefined;
  maxAmount = 1000000000;

  constructor(
    public sessionQuery: SessionQuery,
    private router: Router,
    private navCtrl: NavController
  ) {
    const state = this.router.getCurrentNavigation()?.extras.state;
    if (state?.address) {
      this.senderAddress = state.address;
    } else {
      // this.navCtrl.navigateRoot('wallet/transfer-funds');
    }
  }

  ngOnInit() {
    this.setBalanceLimit(this.selectedCurrency);
  }

  setBalance(event: any) {
    const { value } = event.target;
    this.setBalanceLimit(value);
  }

  async setBalanceLimit(value: string) {
    const xrplBalances = await firstValueFrom(this.sessionQuery.xrplBalances);
    const balance = xrplBalances?.find(
      ({ assetDisplay }) => assetDisplay.assetSymbol === value
    );

    if (balance) {
      this.balanceLimit = assetAmountFromBase(this.maxAmount, balance);
    }
  }

  onAmountSubmitted(amount: number): void {
    console.log(amount);
  }
}
