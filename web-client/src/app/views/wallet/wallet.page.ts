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
import { ToastController } from '@ionic/angular';
import { WalletService } from 'src/app/services/wallet';
import { SessionQuery } from 'src/app/stores/session';
import { defined } from 'src/app/utils/errors/panic';
import { SwalHelper } from 'src/app/utils/notification/swal-helper';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.page.html',
  styleUrls: ['./wallet.page.scss'],
})
export class WalletPage implements OnInit {
  faWallet = faWallet;

  actionItems = [
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

  constructor(
    private toastCtrl: ToastController,
    private notification: SwalHelper,

    public sessionQuery: SessionQuery,
    private walletService: WalletService
  ) {}

  /**
   * When the wallet first displays, perform opportunistic asset opt-in.
   *
   * - If there's no Algo balance, show a suggestion to deposit.
   * - If the account has an Algo balance but no asset balance, attempt to send an asset opt-in.
   */
  async ngOnInit(): Promise<void> {
    if (this.walletService.hasAlgorandAlgoBalance()) {
      const assetId = defined(environment.defaultAlgorandAssetId);
      if (!this.walletService.hasAlgorandAssetBalance(assetId)) {
        const sending = await this.toast('Sending asset opt-in…');
        try {
          await this.walletService.sendAssetOptIn(assetId);
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

  async toast(
    message: string,
    opts?: ToastOptions
  ): Promise<HTMLIonToastElement> {
    const toast = await this.toastCtrl.create({
      message,
      duration: 5000,
      ...opts,
    });
    await toast.present();
    return toast;
  }

  async errorNotification(titleText: string, err: any): Promise<void> {
    const text = err?.response?.body?.message ?? err?.response?.body ?? err;
    console.error('WalletPage.withAlertErrors caught', { err });
    await this.notification.swal.fire({
      icon: 'error',
      titleText,
      text,
    });
  }
}

// XXX(Pi): This type should be exported by ToastController, but isn't.
type ToastOptions = Parameters<typeof ToastController.prototype.create>[0];
