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
import { LoadingController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SessionAlgorandService } from 'src/app/state/session-algorand.service';
import { SessionQuery } from 'src/app/state/session.query';
import { algoAmount, AssetAmount } from 'src/app/utils/asset.display';
import { withLoadingOverlayOpts } from 'src/app/utils/loading.helpers';

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

  constructor(
    private loadingController: LoadingController,
    public sessionQuery: SessionQuery,
    public sessionAlgorandService: SessionAlgorandService
  ) {}

  ngOnInit() {}

  async onRefresh(): Promise<void> {
    await withLoadingOverlayOpts(
      this.loadingController,
      { message: 'Refreshing…' },
      async () => {
        await this.sessionAlgorandService.loadAccountData();
      }
    );
  }
}
