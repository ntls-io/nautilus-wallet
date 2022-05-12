import { Component, Input, OnInit } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';
import { combineLatest, map, Observable } from 'rxjs';
import { checkTxResponseSucceeded } from 'src/app/services/xrpl.utils';
import { SessionAlgorandService } from 'src/app/state/session-algorand.service';
import { SessionXrplService } from 'src/app/state/session-xrpl.service';
import { SessionQuery } from 'src/app/state/session.query';
import { SessionService } from 'src/app/state/session.service';
import { AssetAmount } from 'src/app/utils/assets/assets.common';
import {
  withConsoleGroup,
  withConsoleGroupCollapsed,
} from 'src/app/utils/console.helpers';
import { defined } from 'src/app/utils/errors/panic';
import { withLoadingOverlayOpts } from 'src/app/utils/loading.helpers';
import { SwalHelper } from 'src/app/utils/notification/swal-helper';
import { showToast } from 'src/app/utils/toast.helpers';
import { environment } from 'src/environments/environment';
import { WalletDisplay } from 'src/schema/entities';

/**
 * @see PureWalletPageComponent
 */
@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.page.html',
  styleUrls: ['./wallet.page.scss'],
})
export class WalletPage implements OnInit {
  /** (Optional) Hook to override environment setting, if given. */
  @Input() requireKycBeforeSendPayment =
    environment?.requireOnfidoCheckBeforeSendPayment;

  /** Active wallet owner's name. */
  name: Observable<WalletDisplay['owner_name'] | undefined> =
    this.sessionQuery.name;

  /** Active wallet's balances. */
  balances: Observable<AssetAmount[]> = this.sessionQuery.allBalances;

  /** True if balances are in the process of being updated */
  balancesIsLoading = false;

  /**
   * Enable the "Send Money" action if both:
   * - KYC status is either cleared or not required
   * - At least one balance is available
   */
  actionSendMoneyEnabled: Observable<boolean> = combineLatest(
    this.sessionQuery.onfidoCheckIsClear,
    this.sessionQuery.allBalances
  ).pipe(
    map(
      ([onfidoCheckIsClear, assetAmounts]) =>
        (onfidoCheckIsClear || !this.requireKycBeforeSendPayment) &&
        assetAmounts.length > 0
    )
  );

  /** Show the "Verify Profile" if KYC status is not cleared. */
  actionVerifyProfileShown: Observable<boolean> =
    this.sessionQuery.onfidoCheckIsClear.pipe(
      map((onfidoCheckIsClear: boolean) => !onfidoCheckIsClear)
    );

  constructor(
    private loadingController: LoadingController,
    public sessionQuery: SessionQuery,
    public sessionService: SessionService,
    public sessionAlgorandService: SessionAlgorandService,
    public sessionXrplService: SessionXrplService,
    private toastCtrl: ToastController,
    private notification: SwalHelper
  ) {}

  /**
   * When the wallet first displays, perform opportunistic asset opt-in.
   */
  async ngOnInit(): Promise<void> {
    await this.refreshWalletData();
  }

  async onRefresh(): Promise<void> {
    await withLoadingOverlayOpts(
      this.loadingController,
      { message: 'Refreshing…' },
      async () => await this.refreshWalletData()
    );
  }

  async refreshWalletData(): Promise<void> {
    this.balancesIsLoading = true;
    try {
      await withConsoleGroup('WalletPage.refreshWalletData:', async () => {
        await withConsoleGroupCollapsed('Loading wallet data', async () => {
          await Promise.all([
            (async () => {
              await this.sessionAlgorandService.loadAccountData();
              await this.sessionAlgorandService.loadAssetParams();
            })(),
            this.sessionXrplService.loadAccountData(),
            this.sessionService.loadOnfidoCheck(),
          ]);
        });
        await withConsoleGroupCollapsed(
          'Checking asset / token opt-ins',
          async () => {
            await this.checkAlgorandAssetOptIn();
            await this.checkXrplTokenOptIns();
          }
        );
        console.log('Done.');
      });
    } finally {
      this.balancesIsLoading = false;
    }
  }
  /**
   * Perform opportunistic Algorand asset opt-in.
   *
   * - If there's no Algo balance, show a suggestion to deposit.
   * - If the account has an Algo balance but no asset balance, attempt to send an asset opt-in.
   */
  protected async checkAlgorandAssetOptIn(): Promise<void> {
    if (
      this.sessionQuery.hasAlgorandBalance() &&
      // FIXME: Remove
      environment.defaultAlgorandAssetId
    ) {
      const assetId = defined(environment.defaultAlgorandAssetId);
      if (!this.sessionQuery.hasAlgorandAssetBalance(assetId)) {
        const sending = await this.toast('Sending asset opt-in…');
        try {
          await this.sessionAlgorandService.sendAssetOptIn(assetId);
        } catch (err) {
          await sending.dismiss();
          await this.errorNotification('Asset opt-in failed', err);
          return;
        }
        await this.toast('Asset opt-in successful.');
      }
    }
  }

  /**
   * Perform opportunistic XRPL token opt-in.
   */
  protected async checkXrplTokenOptIns(): Promise<void> {
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

  protected async errorNotification(
    titleText: string,
    err: any
  ): Promise<void> {
    const text = err?.response?.body?.message ?? err?.response?.body ?? err;
    console.error('WalletPage.withAlertErrors caught', { err });
    await this.notification.swal.fire({
      icon: 'error',
      titleText,
      text,
    });
  }
}
