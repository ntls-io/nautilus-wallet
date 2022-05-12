import { Component, Input, OnInit } from '@angular/core';
import {
  faCreditCard,
  faDonate,
  faFingerprint,
  faHandHoldingUsd,
  faQrcode,
  faReceipt,
  faWallet,
} from '@fortawesome/free-solid-svg-icons';
import { AssetAmount } from 'src/app/utils/assets/assets.common';

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
  @Input() actionReceiveEnabled: boolean | null = false;

  /** "My Transactions" action: Optional external URL. */
  @Input() actionMyTransactionsUrl?: string | null;

  icons = ICONS;

  constructor() {}

  ngOnInit() {}
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
};
