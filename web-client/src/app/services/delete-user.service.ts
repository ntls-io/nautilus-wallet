import { Injectable } from '@angular/core';
import { LoadingController, NavController } from '@ionic/angular';
import { checkTxResponseSucceeded } from 'src/app/services/xrpl.utils';
import { SessionXrplService } from 'src/app/state/session-xrpl.service';
import { SessionQuery } from 'src/app/state/session.query';
import { withConsoleGroupCollapsed } from 'src/app/utils/console.helpers';
import { withLoadingOverlayOpts } from 'src/app/utils/loading.helpers';
import { SwalHelper } from 'src/app/utils/notification/swal-helper';
import * as xrpl from 'xrpl';
import { TxResponse } from 'xrpl';
import { SetupQuery } from '../state/setup';

@Injectable({
  providedIn: 'root',
})
export class DeleteUserService {
  constructor(
    public sessionQuery: SessionQuery,
    private loadingCtrl: LoadingController,
    private sessionXrplService: SessionXrplService,
    private notification: SwalHelper,
    private navCtrl: NavController,
    private setupQuery: SetupQuery
  ) {}

  async deleteWallet(): Promise<void> {
    const { xrpIssuer } = this.setupQuery;
    await withConsoleGroupCollapsed(
      'Defaulting asset / token opt-ins',
      async () => {
        await this.defaultXrplTokenOptIns();
      }
    );

    if (xrpIssuer) {
      const result = await withLoadingOverlayOpts<
        { xrplResult: TxResponse } | undefined
      >(this.loadingCtrl, { message: 'Confirming Transaction' }, () => {
        if (xrpIssuer) {
          return this.deleteByLedgerType(xrpIssuer);
        }
        return Promise.resolve(undefined);
      });
      if (result) {
        await this.notifyResult(result, xrpIssuer);
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
        titleText: 'Account Deleted!',
        text: 'You have successfully deleted your Account.',
        html: `<div >
              <h2 class="text-primary font-bold">Wallet Deleted!</h2>
              <h3 class="text-primary font-bold">You have successfully deleted your Wallet.</h3>
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
