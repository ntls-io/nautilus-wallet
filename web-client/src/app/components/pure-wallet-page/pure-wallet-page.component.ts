import { Component, Input, OnInit } from '@angular/core';
import { OpenNativeSettings } from '@awesome-cordova-plugins/open-native-settings/ngx';
import { Capacitor } from '@capacitor/core';
import {
  faCircleNodes,
  faCreditCard,
  faDonate,
  faFingerprint,
  faHandHoldingUsd,
  faQrcode,
  faReceipt,
  faTrash,
  faWallet,
} from '@fortawesome/free-solid-svg-icons';
import { NavController } from '@ionic/angular';
import { ScannerService } from 'src/app/services/scanner.service';
import { ConnectorQuery } from 'src/app/state/connector';
import { AssetAmount } from 'src/app/utils/assets/assets.common';
import { SwalHelper } from 'src/app/utils/notification/swal-helper';

/**
 * @see WalletPage
 */
@Component({
  selector: 'app-pure-wallet-page',
  templateUrl: './pure-wallet-page.component.html',
  styleUrls: ['./pure-wallet-page.component.scss'],
})
export class PureWalletPageComponent implements OnInit {
  /** Wallet owner's name. */
  @Input() name?: string | null;

  /** Wallet's balances. */
  @Input() balances?: AssetAmount[] | null;

  /** True if balances are in the process of being updated */
  @Input() balancesIsLoading = false;

  // Naming convention: Prefix action item parameters with "action".

  /** "Send Money" action: Enabled? */
  @Input() actionSendMoneyEnabled: boolean | null = true;

  /** "Top Up" action: Optional external URL. */
  @Input() actionTopUpUrl?: string | null;

  /** "Verify Profile" action: Shown? */
  @Input() actionVerifyProfileShown?: boolean | null;

  /** "Withdraw" action: Optional external URL. */
  @Input() actionWithdrawUrl?: string | null;

  /** "Receive" action: Enabled? */
  @Input() actionReceiveEnabled: boolean | null = true;

  /** "My Transactions" action: Optional external URL. */
  @Input() actionMyTransactionsUrl?: string | null;

  icons = ICONS;

  constructor(
    public connectorQuery: ConnectorQuery,
    private scannerService: ScannerService,
    private navCtrl: NavController,
    private notification: SwalHelper,
    private openNativeSettings: OpenNativeSettings
  ) {}

  ngOnInit() {}
  async verifyProfile() {
    if (Capacitor.isNativePlatform()) {
      const granted = await this.scannerService.requestPermissions();
      if (granted) {
        this.navCtrl.navigateForward('/kyc');
      } else {
        this.notification.swal
          .fire({
            title: 'Permission Denied',
            text: 'Please enable camera permissions in your device settings.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Open Settings',
          })
          .then(async ({ isConfirmed }) => {
            if (isConfirmed) {
              await this.openNativeSettings.open('application_details');
            }
          });
      }
    } else {
      this.navCtrl.navigateForward('/kyc');
    }
  }
}

// Placeholder icons until we get definite ones.
const ICONS = {
  faCreditCard,
  faDonate,
  faFingerprint,
  faHandHoldingUsd,
  faQrcode,
  faReceipt,
  faWallet,
  faTrash,
  faCircleNodes,
};
