import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController, NavController } from '@ionic/angular';
import { checkTxResponseSucceeded } from 'src/app/services/xrpl.utils';
import { SessionXrplService } from 'src/app/state/session-xrpl.service';
import { SessionQuery } from 'src/app/state/session.query';
import { withConsoleGroupCollapsed } from 'src/app/utils/console.helpers';
import { withLoadingOverlayOpts } from 'src/app/utils/loading.helpers';
import { SwalHelper } from 'src/app/utils/notification/swal-helper';
import * as xrpl from 'xrpl';
import { TxResponse } from 'xrpl';

@Component({
  selector: 'app-deposit-funds',
  templateUrl: './deposit-funds.page.html',
  styleUrls: ['./deposit-funds.page.scss'],
})
export class DepositFundsPage implements OnInit {
  autofocus = true;

  /** A balance held by the current user. */
  balance = this.sessionQuery.xrplBalances;

  /** The address to receive the payment. */
  receiverAddress?: string | null;

  constructor(
    public sessionQuery: SessionQuery,
    private loadingCtrl: LoadingController,
    private sessionXrplService: SessionXrplService,
    private notification: SwalHelper,
    private navCtrl: NavController,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.receiverAddress = params.receiverAddress;
    });
  }

  async deleteWallet(): Promise<void> {
    await withConsoleGroupCollapsed(
      'Defaulting asset / token opt-ins',
      async () => {
        await this.defaultXrplTokenOptIns();
      }
    );

    if (this.receiverAddress) {
      const result = await withLoadingOverlayOpts<
        { xrplResult: TxResponse } | undefined
      >(this.loadingCtrl, { message: 'Confirming Transaction' }, () => {
        if (this.receiverAddress) {
          return this.deleteByLedgerType(this.receiverAddress);
        }
        return Promise.resolve(undefined);
      });
      if (result) {
        await this.notifyResult(result, this.receiverAddress);
      }
    }
  }

  protected async defaultXrplTokenOptIns(): Promise<void> {
    if (this.sessionQuery.hasXrpBalance()) {
      const txResponses =
        await this.sessionXrplService.defaultTrustlineOptIns();
      const unsuccessfulResponses = txResponses.filter((txResponse) => {
        const { succeeded } = checkTxResponseSucceeded(txResponse);
        return !succeeded;
      });
      if (0 < unsuccessfulResponses.length) {
        console.log(
          'DepositFundsPage.defaultXrplTokenOptIns: unsuccessful responses:',
          { unsuccessfulResponses }
        );
        const errorMessage: string = unsuccessfulResponses
          .map((txResponse) => {
            const { resultCode } = checkTxResponseSucceeded(txResponse);
            return resultCode;
          })
          .join('\n');
        await this.errorNotification('XRPL token opt-out failed', errorMessage);
      }
    }
  }

  protected async errorNotification(
    titleText: string,
    err: any
  ): Promise<void> {
    const text = err?.response?.body?.message ?? err?.response?.body ?? err;
    console.error('DepositFundsPage.withAlertErrors caught', { err });
    await this.notification.swal.fire({
      icon: 'error',
      titleText,
      text,
    });
  }

  protected async deleteByLedgerType(
    receiverAddress: string
  ): Promise<{ xrplResult: TxResponse }> {
    return {
      xrplResult: await this.sessionXrplService.deleteAccount(receiverAddress),
    };
  }

  protected async notifyResult(
    result: { xrplResult: TxResponse },
    receiverAddress: string
  ): Promise<void> {
    const { xrplResult: txResponse } = result;

    const { succeeded, resultCode } = checkTxResponseSucceeded(txResponse);

    if (succeeded) {
      this.notifySuccess({
        address: receiverAddress,
        txId: txResponse.id.toString(),
        timestamp: new Date(),
      });
    } else {
      await this.notifyXrplFailure({ resultCode });
    }
  }

  protected notifySuccess({
    address,
    txId,
    timestamp,
    txUrlPrefix,
  }: {
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
        text: 'Your remaining XRP balance was sent successfully.',
        html: `<div >
              <h2 class="text-primary font-bold">Account Deleted!</h2>
              <p class="text-xs"><b>Receiver of remaining balance:</b> ${address}</p>
              <p class="text-xs"><b>Transaction ID:</b> ${txIdHtml}</p>
              <p class="text-xs">Completed on ${timestamp.toLocaleString()}</p>
            </div>`,
        confirmButtonText: 'DONE',
      })
      .then(({ isConfirmed }) => {
        if (isConfirmed) {
          this.navCtrl.navigateRoot('landing');
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
