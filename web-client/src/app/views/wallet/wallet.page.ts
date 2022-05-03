import { Component, OnInit } from '@angular/core';
import {
  faCreditCard,
  faDonate,
  faFingerprint,
  faHandHoldingUsd,
  faQrcode,
  faReceipt,
  faWallet,
} from '@fortawesome/free-solid-svg-icons';
import { LoadingController, ToastController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { ActionItem } from 'src/app/components/action-item/action-item.component';
import { SessionAlgorandService } from 'src/app/state/session-algorand.service';
import { SessionXrplService } from 'src/app/state/session-xrpl.service';
import { SessionQuery } from 'src/app/state/session.query';
import { AssetAmount } from 'src/app/utils/assets/assets.common';
import { defined } from 'src/app/utils/errors/panic';
import { withLoadingOverlayOpts } from 'src/app/utils/loading.helpers';
import { SwalHelper } from 'src/app/utils/notification/swal-helper';
import { showToast } from 'src/app/utils/toast.helpers';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.page.html',
  styleUrls: ['./wallet.page.scss'],
})
export class WalletPage implements OnInit {
  faWallet = faWallet;

  actionItems: ActionItem[] = [
    {
      title: 'Send Money',
      icon: faCreditCard,
      path: '/wallet/send-funds',
    },
    {
      title: 'Top Up Wallet',
      icon: faDonate,
      // TODO(Pi): Parameterize this
      url: 'https://testnet.algoexplorer.io/dispenser',
      disabled: true,
    },
    {
      title: 'Verify Profile',
      icon: faFingerprint,
      path: '/kyc',
    },
    {
      title: 'Withdraw',
      icon: faHandHoldingUsd,
      disabled: true,
    },
    {
      title: 'Receive',
      icon: faQrcode,
      path: '/wallet/receive',
      disabled: true,
    },
    {
      title: 'My Transactions',
      icon: faReceipt,
      disabled: true,
    },
  ]; // Placeholder icons until we get definite ones.

  balances: Observable<AssetAmount[]> = this.sessionQuery.allBalances;

  constructor(
    private loadingController: LoadingController,
    public sessionQuery: SessionQuery,
    public sessionAlgorandService: SessionAlgorandService,
    public sessionXrplService: SessionXrplService,
    private toastCtrl: ToastController,
    private notification: SwalHelper
  ) {}

  /**
   * When the wallet first displays, perform opportunistic asset opt-in.
   */
  async ngOnInit(): Promise<void> {
    await this.checkAlgorandAssetOptIn();
  }

  async onRefresh(): Promise<void> {
    await withLoadingOverlayOpts(
      this.loadingController,
      { message: 'Refreshing…' },
      async () => {
        await Promise.all([
          (async () => {
            await this.sessionAlgorandService.loadAccountData();
            await this.sessionAlgorandService.loadAssetParams();
          })(),
          this.sessionXrplService.loadAccountData(),
        ]);
      }
    );
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
    } else {
      await this.toast('No account balance. Deposit some Algo to get started.');
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
