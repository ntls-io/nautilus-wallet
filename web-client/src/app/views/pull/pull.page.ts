import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, NavController } from '@ionic/angular';
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
  formatAssetAmount,
  formatAssetSymbol,
  getAssetCommission,
} from 'src/app/utils/assets/assets.common';
import {
  assetAmountXrp,
  AssetAmountXrp,
  convertFromAssetAmountXrpToLedger,
  isAssetAmountXrp,
} from 'src/app/utils/assets/assets.xrp';
import {
  assetAmountXrplToken,
  AssetAmountXrplToken,
  convertFromAssetAmountXrplTokenToLedger,
  isAssetAmountXrplToken,
} from 'src/app/utils/assets/assets.xrp.token';
import { environment } from 'src/environments/environment';
import { never } from 'src/helpers/helpers';
import * as xrpl from 'xrpl';
import { Payment, TxResponse } from 'xrpl';
import { TransactionConfirmation } from '../../services/algosdk.utils';
import { checkTxResponseSucceeded } from '../../services/xrpl.utils';
import { defined, panic } from '../../utils/errors/panic';
import { withLoadingOverlayOpts } from '../../utils/loading.helpers';
import { SwalHelper } from '../../utils/notification/swal-helper';

@Component({
  selector: 'app-pull',
  templateUrl: './pull.page.html',
  styleUrls: ['./pull.page.scss'],
})
export class PullPage implements OnInit {
  isPinEntryOpen = false;
  senderAddress: string | undefined;
  selectedCurrency = environment.hideXrpBalance
    ? environment.tokenSymbol
    : 'XRP';

  amount: AssetAmountXrp | AssetAmountXrplToken | undefined;

  balance: AssetAmount | undefined;
  maxAmount = 1000000000;

  constructor(
    public sessionQuery: SessionQuery,
    private sessionStore: SessionStore,
    private router: Router,
    private navCtrl: NavController,
    private connectorQuery: ConnectorQuery,
    private sessionXrplService: SessionXrplService,
    private loadingCtrl: LoadingController,
    private notification: SwalHelper
  ) {
    const state = this.router.getCurrentNavigation()?.extras.state;
    if (state?.address) {
      this.senderAddress = state.address;
    } else {
      // this.navCtrl.navigateRoot('wallet/transfer-funds');
      this.navCtrl.pop();
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
    this.selectedCurrency = value;
  }

  async setBalanceLimit(currency: string) {
    const balance = await this.getXrplBalance(currency);

    if (balance) {
      this.balance = assetAmountFromBase(this.maxAmount, balance);
    }
  }

  async onAmountSubmitted(amount: number): Promise<void> {
    if (this.selectedCurrency === 'XRP') {
      this.amount = assetAmountXrp(amount);
    } else {
      const currency = environment.tokenSymbol;
      const issuer = environment.tokenIssuer;
      this.amount = assetAmountXrplToken(amount, { currency, issuer });
    }
    this.isPinEntryOpen = true;
  }

  async onPinConfirmed(pin: any) {
    const amount = defined(this.amount);
    const sender = defined(this.senderAddress);
    if (isAssetAmountXrp(amount) || isAssetAmountXrplToken(amount)) {
      const result = await withLoadingOverlayOpts(
        this.loadingCtrl,
        { message: 'Confirming Transaction' },
        () => this.receiveXrpl(amount, sender, pin)
      );
      await this.notifyResult(result, amount, sender);
    }
  }

  protected async receiveXrpl(
    amount: AssetAmountXrp | AssetAmountXrplToken,
    senderAddress: string,
    senderPin: string
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
        senderAddress,
        senderPin
      );
    } else {
      return {
        xrplResult: await this.sessionXrplService.sendFunds(
          receiverAddress,
          mainAmount,
          senderAddress,
          senderPin
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

  protected async notifyResult(
    result:
      | { algorandResult: TransactionConfirmation }
      | { xrplResult: TxResponse }
      | CommissionedTxResponse,
    amount: AssetAmount,
    receiverAddress: string
  ): Promise<void> {
    if ('algorandResult' in result) {
      const { algorandResult: confirmation } = result;
      this.notifySuccess({
        amount: `${formatAssetAmount(amount)} ${formatAssetSymbol(amount)}`,
        address: receiverAddress,
        txId: confirmation.txId,
        timestamp: new Date(),
        txUrlPrefix: environment.algorandTransactionUrlPrefix,
      });
    } else if ('xrplResult' in result) {
      const { xrplResult: txResponse } = result;

      const { succeeded, resultCode } = checkTxResponseSucceeded(txResponse);

      if (succeeded) {
        this.notifySuccess({
          amount: `${formatAssetAmount(amount)} ${formatAssetSymbol(amount)}`,
          address: receiverAddress,
          txId: txResponse.id.toString(),
          timestamp: new Date(),
        });
      } else {
        await this.notifyXrplFailure({ resultCode });
      }
    } else if ('mainTx' in result) {
      // TODO(Jonathan): Update the success notification to cater for commissioned transactions
      const { mainTx, commissionedTx } = result;
      if (mainTx.success && commissionedTx?.success) {
        this.notifySuccess({
          amount: `${formatAssetAmount(amount)} ${formatAssetSymbol(amount)}`,
          address: receiverAddress,
          txId: mainTx.response.id.toString(),
          timestamp: new Date(),
        });
      } else if (!mainTx.success) {
        await this.notifyXrplFailure({ resultCode: mainTx.resultCode });
      } else if (
        result.mainTx.success &&
        commissionedTx &&
        !commissionedTx.success
      ) {
        await this.notifyXrplFailure({
          resultCode: commissionedTx.resultCode,
        });
      } else {
        throw panic('Invalid commisioned transaction result.', result);
      }
    } else {
      throw never(result);
    }
  }

  protected notifySuccess({
    amount,
    address,
    txId,
    timestamp,
    txUrlPrefix,
  }: {
    amount: string;
    address: string;
    txId: string;
    timestamp: Date;
    txUrlPrefix?: string;
  }): void {
    const txIdHtml = txUrlPrefix
      ? `<a href="${txUrlPrefix}${txId}" target="_blank" >${txId}</a>`
      : `${txId}`;
    this.notification.swal
      .fire({
        icon: 'success',
        titleText: 'Money sent!',
        text: 'Your money was sent successfully.',
        html: `<div >
              <h2 class="text-primary font-bold">${amount}</h2>
              <p class="text-xs"><b>Sender:</b> ${address}</p>
              <p class="text-xs"><b>Transaction ID:</b> ${txIdHtml}</p>
              <p class="text-xs">Completed on ${timestamp.toLocaleString()}</p>
            </div>`,
        confirmButtonText: 'DONE',
      })
      .then(({ isConfirmed }) => {
        if (isConfirmed) {
          this.navCtrl.navigateRoot('wallet');
        }
      });
  }

  protected async notifyXrplFailure({
    resultCode,
  }: {
    resultCode: xrpl.TransactionMetadata['TransactionResult'];
  }): Promise<void> {
    const categoryLocalError = resultCode.startsWith('tel');
    const categoryRetry = resultCode.startsWith('ter');
    const retryable = categoryLocalError || categoryRetry;

    await this.notification.swal.fire({
      icon: retryable ? 'warning' : 'error',
      titleText: 'Transaction failed',
      html: [
        ...(categoryLocalError ? ['<p>(Local error)</p>'] : []),
        ...(categoryRetry ? ['<p>(Retry possible)</p>'] : []),
        `<p>Result code: ${resultCode}</p>`,
        '<p>See <a href="https://xrpl.org/transaction-results.html" target="_blank">Transaction Results</a> for more details.</p>',
      ].join('\n'),
    });
  }
}
