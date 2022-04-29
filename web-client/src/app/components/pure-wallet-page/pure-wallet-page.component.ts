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
import { ActionItem } from 'src/app/components/action-item/action-item.component';
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

  constructor() {}

  ngOnInit() {}
}
