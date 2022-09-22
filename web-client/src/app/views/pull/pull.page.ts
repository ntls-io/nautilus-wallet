import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { firstValueFrom } from 'rxjs';
import { ConnectorQuery } from 'src/app/state/connector';
import {
  CommissionedTxResponse,
  SessionXrplService,
} from 'src/app/state/session-xrpl.service';
import { SessionQuery } from 'src/app/state/session.query';
import { SessionStore } from 'src/app/state/session.store';
import {
  AssetAmount,
  assetAmountFromBase,
  getAssetCommission,
} from 'src/app/utils/assets/assets.common';
import {
  AssetAmountXrp,
  convertFromAssetAmountXrpToLedger,
  isAssetAmountXrp,
} from 'src/app/utils/assets/assets.xrp';
import {
  AssetAmountXrplToken,
  convertFromAssetAmountXrplTokenToLedger,
  isAssetAmountXrplToken,
} from 'src/app/utils/assets/assets.xrp.token';
import { never } from 'src/helpers/helpers';
import { Payment, TxResponse } from 'xrpl';

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
    private sessionStore: SessionStore,
    private router: Router,
    private navCtrl: NavController,
    private connectorQuery: ConnectorQuery,
    private sessionXrplService: SessionXrplService
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

  onPinConfirmed(pin: any) {
    this.sessionStore.update({
      externalSesion: { wallet: this.senderAddress, pin },
    });
  }

  protected async receiveXrpl(
    amount: AssetAmountXrp | AssetAmountXrplToken,
    senderAddress: string
  ): Promise<CommissionedTxResponse | { xrplResult: TxResponse }> {
    const mainAmount = this.convertXrpAmount(amount);
    const isConnector = !!this.connectorQuery.getValue().walletId;
    const receiverAddress =
      this.sessionQuery.assumeActiveSession().wallet.xrpl_account
        .address_base58;

    if (isConnector) {
      const assetCommission = getAssetCommission(amount, isConnector) as
        | AssetAmountXrp
        | AssetAmountXrplToken;
      const commissionAmount = this.convertXrpAmount(assetCommission);
      const amountMinusCommision = this.convertXrpAmount({
        ...amount,
        amount: amount.amount - assetCommission.amount,
      });
      return this.sessionXrplService.sendFundsCommissioned(
        receiverAddress,
        amountMinusCommision,
        commissionAmount,
        senderAddress
      );
    } else {
      return {
        xrplResult: await this.sessionXrplService.sendFunds(
          receiverAddress,
          mainAmount,
          senderAddress
        ),
      };
    }
  }

  protected convertXrpAmount(
    amount: AssetAmountXrp | AssetAmountXrplToken
  ): Payment['Amount'] {
    if (isAssetAmountXrp(amount)) {
      return convertFromAssetAmountXrpToLedger(amount);
    } else if (isAssetAmountXrplToken(amount)) {
      return convertFromAssetAmountXrplTokenToLedger(amount);
    } else {
      throw never(amount);
    }
  }
}
