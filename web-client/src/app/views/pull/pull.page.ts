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
  isPinEntryOpen = false;
  senderAddress: string | undefined;
  selectedCurrency = 'XRP';

  balance: AssetAmount | undefined;
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

  async getXrplBalance(currency: string): Promise<AssetAmount | undefined> {
    const xrplBalances = await firstValueFrom(this.sessionQuery.xrplBalances);
    const balance = xrplBalances?.find(
      ({ assetDisplay }) => assetDisplay.assetSymbol === currency
    );

    return balance;
  }

  ngOnInit() {
    this.setBalanceLimit(this.selectedCurrency);
  }

  setCurrency(event: any) {
    const { value } = event.target;
    this.setBalanceLimit(value);
  }

  async setBalanceLimit(currency: string) {
    const balance = await this.getXrplBalance(currency);

    if (balance) {
      this.balance = assetAmountFromBase(this.maxAmount, balance);
    }
  }

  async onAmountSubmitted(amount: number): Promise<void> {
    const balance = await this.getXrplBalance(this.selectedCurrency);
    if (balance) {
      const assetAmount: AssetAmount = assetAmountFromBase(amount, balance);
      console.log(assetAmount);
      this.isPinEntryOpen = true;
    }
  }

  onPinConfirmed(event: any) {
    console.log(event);
  }
}
