import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { filterNilValue } from '@datorama/akita';
import { LoadingController, NavController } from '@ionic/angular';
import { Observable, pluck } from 'rxjs';
import { Payment } from 'src/app/components/pay/pay.component';
import { TransactionConfirmation } from 'src/app/services/algosdk.utils';
import { checkTxResponseSucceeded } from 'src/app/services/xrpl.utils';
import { ConnectorQuery } from 'src/app/state/connector';
import { SessionAlgorandService } from 'src/app/state/session-algorand.service';
import {
  CommissionedTxResponse,
  SessionXrplService,
} from 'src/app/state/session-xrpl.service';
import { SessionQuery } from 'src/app/state/session.query';
import { isAssetAmountAlgo } from 'src/app/utils/assets/assets.algo';
import {
  convertFromAssetAmountAsaToLedger,
  isAssetAmountAsa,
} from 'src/app/utils/assets/assets.algo.asa';
import {
  AssetAmount,
  formatAssetAmount,
  formatAssetSymbol,
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
import { panic } from 'src/app/utils/errors/panic';
import { withLoadingOverlayOpts } from 'src/app/utils/loading.helpers';
import { SwalHelper } from 'src/app/utils/notification/swal-helper';
import { environment } from 'src/environments/environment';
import { never } from 'src/helpers/helpers';
import { WalletId } from 'src/schema/types';
import * as xrpl from 'xrpl';
import { TxResponse } from 'xrpl';

@Component({
  selector: 'app-pay-page',
  templateUrl: './pay.page.html',
  styleUrls: ['./pay.page.scss'],
})
export class PayPage implements OnInit {
  /** @see PayAmountFormComponent.autofocus */
  @Input() autofocus = true;

  senderName: Observable<string> = this.sessionQuery.wallet.pipe(
    filterNilValue(),
    pluck('owner_name')
  );

  receiverAddress: WalletId | undefined;

  algorandBalances: Observable<AssetAmount[]> =
    this.sessionQuery.algorandBalances;

  xrplBalances: Observable<AssetAmount[] | undefined> =
    this.sessionQuery.xrplBalances;

  onfidoCheckIsClear: Observable<boolean> =
    this.sessionQuery.onfidoCheckIsClear;

  constructor(
    private router: Router,
    private navCtrl: NavController,
    private sessionAlgorandService: SessionAlgorandService,
    private sessionXrplService: SessionXrplService,
    public sessionQuery: SessionQuery,
    private loadingCtrl: LoadingController,
    private notification: SwalHelper,
    private connectorQuery: ConnectorQuery
  ) {
    const state = this.router.getCurrentNavigation()?.extras.state;
    if (state) {
      this.receiverAddress = state.address;
    } else {
      this.navCtrl.pop();
    }
  }

  ngOnInit() {}

  async onPaymentSubmitted({
    amount,
    option: { receiverAddress },
  }: Payment): Promise<void> {
    const result = await withLoadingOverlayOpts(
      this.loadingCtrl,
      { message: 'Confirming Transaction' },
      () => this.sendByLedgerType(amount, receiverAddress)
    );
    await this.notifyResult(result, amount, receiverAddress);
  }

  /**
   * Send an amount to `receiverAddress` using the amount's ledger type and asset info.
   *
   * This currently handles:
   *
   * - Algorand: Algo & ASA
   * - XRPL: XRP & tokens
   *
   * @todo Move this into an appropriate aggregated payment service somewhere?
   */
  protected async sendByLedgerType(
    amount: AssetAmount,
    receiverAddress: string
  ): Promise<
    | { algorandResult: TransactionConfirmation }
    | { xrplResult: TxResponse }
    | CommissionedTxResponse
  > {
    if (isAssetAmountAlgo(amount)) {
      return {
        algorandResult: await this.sessionAlgorandService.sendAlgos(
          receiverAddress,
          amount.amount
        ),
      };
    } else if (isAssetAmountAsa(amount)) {
      const { amount: amountInLedgerUnits, assetId } =
        convertFromAssetAmountAsaToLedger(amount);
      return {
        algorandResult: await this.sessionAlgorandService.sendAssetFunds(
          assetId,
          receiverAddress,
          amountInLedgerUnits
        ),
      };
    } else if (isAssetAmountXrp(amount) || isAssetAmountXrplToken(amount)) {
      return this.sendXrpl(amount, receiverAddress);
    } else {
      throw panic('PayPage.sendAmount: unexpected amount', { amount });
    }
  }

  protected convertXrpAmount(
    amount: AssetAmountXrp | AssetAmountXrplToken
  ): xrpl.Payment['Amount'] {
    if (isAssetAmountXrp(amount)) {
      return convertFromAssetAmountXrpToLedger(amount);
    } else if (isAssetAmountXrplToken(amount)) {
      return convertFromAssetAmountXrplTokenToLedger(amount);
    } else {
      throw never(amount);
    }
  }

  protected async sendXrpl(
    amount: AssetAmountXrp | AssetAmountXrplToken,
    receiverAddress: string
  ): Promise<CommissionedTxResponse | { xrplResult: TxResponse }> {
    const mainAmount = this.convertXrpAmount(amount);
    const isConnector = !!this.connectorQuery.getValue().walletId;

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
        commissionAmount
      );
    } else {
      return {
        xrplResult: await this.sessionXrplService.sendFunds(
          receiverAddress,
          mainAmount
        ),
      };
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
              <p class="text-xs"><b>Receiver:</b> ${address}</p>
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
