import { Component, OnInit } from '@angular/core';
import { filterNilValue } from '@datorama/akita';
import {
  faCreditCard,
  faDonate,
  faFingerprint,
  faHandHoldingUsd,
  faQrcode,
  faReceipt,
  faWallet,
} from '@fortawesome/free-solid-svg-icons';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SessionQuery } from 'src/app/state/session.query';
import { algoAmount, AssetAmount } from 'src/app/utils/asset.display';

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
      url: 'https://testnet.algoexplorer.io/dispenser',
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

  balances: Observable<Array<AssetAmount>> =
    this.sessionQuery.algorandBalanceInAlgos.pipe(
      filterNilValue(),
      map((amount: number): AssetAmount[] => [algoAmount(amount)])
    );

  constructor(public sessionQuery: SessionQuery) {}

  ngOnInit() {}
}
