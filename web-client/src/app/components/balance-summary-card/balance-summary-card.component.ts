import { Component, OnInit } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';
import { UntilDestroy } from '@ngneat/until-destroy';
import { checkTxResponseSucceeded } from 'src/app/services/xrpl.utils';
import { SessionXrplService } from 'src/app/state/session-xrpl.service';
import { SessionQuery } from 'src/app/state/session.query';
import { SessionService } from 'src/app/state/session.service';
import { AssetAmount } from 'src/app/utils/assets/assets.common';
import {
  withConsoleGroup,
  withConsoleGroupCollapsed,
} from 'src/app/utils/console.helpers';
import { withLoadingOverlayOpts } from 'src/app/utils/loading.helpers';
import { SwalHelper } from 'src/app/utils/notification/swal-helper';
import { showToast } from 'src/app/utils/toast.helpers';

@UntilDestroy({ checkProperties: true })
@Component({
  selector: 'app-balance-summary-card',
  templateUrl: './balance-summary-card.component.html',
  styleUrls: ['./balance-summary-card.component.scss'],
})
export class BalanceSummaryCardComponent implements OnInit {
  isLoading = false;
  showAsset = false;

  constructor(
    private sessionXrplService: SessionXrplService,
    private sessionService: SessionService,
    public sessionQuery: SessionQuery,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private notification: SwalHelper
  ) {
    this.sessionQuery.allBalances.subscribe((balances) => {
      const hasXRP = balances.some(
        ({ assetDisplay, amount }) =>
          assetDisplay?.assetSymbol === 'XRP' && amount > 0.0001
      );

      if (hasXRP) {
        this.showAsset = !balances?.some(
          (e: AssetAmount) => e?.assetDisplay.assetSymbol === 'FOO'
        );
      }
    });
  }

  async ngOnInit() {
    await this.refreshWalletData();
  }

  async refresh() {
    await withLoadingOverlayOpts(
      this.loadingCtrl,
      { message: 'Refreshing…' },
      async () => await this.refreshWalletData()
    );
  }

  async refreshWalletData() {
    this.isLoading = true;
    try {
      await withConsoleGroup('WalletPage.refreshWalletData:', async () => {
        await withConsoleGroupCollapsed('Loading wallet data', async () => {
          await Promise.all([
            this.sessionXrplService.loadAccountData(),
            this.sessionService.loadOnfidoCheck(),
          ]);
        });
        await withConsoleGroupCollapsed(
          'Checking asset / token opt-ins',
          async () => {
            await this.checkXrplTokenOptIns();
          }
        );
        console.log('Done.');
      });
    } finally {
      this.isLoading = false;
    }
  }

  /**
   * Perform opportunistic XRPL token opt-in.
   */
  protected async checkXrplTokenOptIns() {
    if (this.sessionQuery.hasXrpBalance()) {
      const txResponses = await this.sessionXrplService.checkTrustlineOptIns();
      const unsuccessfulResponses = txResponses.filter((txResponse) => {
        const { succeeded } = checkTxResponseSucceeded(txResponse);
        return !succeeded;
      });
      if (0 < unsuccessfulResponses.length) {
        console.log(
          'WalletPage.checkXrplTokenOptIns: unsuccessful responses:',
          { unsuccessfulResponses }
        );
        const errorMessage: string = unsuccessfulResponses
          .map((txResponse) => {
            const { resultCode } = checkTxResponseSucceeded(txResponse);
            return resultCode;
          })
          .join('\n');
        await this.errorNotification('XRPL token opt-in failed', errorMessage);
      }
    }
  }

  protected async toast(message: string): Promise<HTMLIonToastElement> {
    return showToast(this.toastCtrl, message, {
      duration: 5000,
    });
  }

  protected async errorNotification(titleText: string, err: any) {
    const text = err?.response?.body?.message ?? err?.response?.body ?? err;
    console.error('WalletPage.withAlertErrors caught', { err });
    await this.notification.swal.fire({
      icon: 'error',
      titleText,
      text,
    });
  }
}
