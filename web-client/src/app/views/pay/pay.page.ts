import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { filterNilValue } from '@datorama/akita';
import { LoadingController, NavController } from '@ionic/angular';
import { Observable, pluck } from 'rxjs';
import { Payment } from 'src/app/components/pay/pay.component';
import { AccountData } from 'src/app/services/algosdk.utils';
import { SessionAlgorandService } from 'src/app/state/session-algorand.service';
import { SessionQuery } from 'src/app/state/session.query';
import {
  formatAssetAmount,
  formatAssetSymbol,
} from 'src/app/utils/asset.display';
import { panic } from 'src/app/utils/errors/panic';
import { withLoadingOverlayOpts } from 'src/app/utils/loading.helpers';
import { SwalHelper } from 'src/app/utils/notification/swal-helper';
import { WalletDisplay } from 'src/schema/entities';

@Component({
  selector: 'app-pay-page',
  templateUrl: './pay.page.html',
  styleUrls: ['./pay.page.scss'],
})
export class PayPage implements OnInit {
  wallet: Observable<WalletDisplay> = this.sessionQuery.wallet.pipe(
    filterNilValue()
  );

  receiverAddress: Observable<string> = this.route.queryParams.pipe(
    pluck('receiverAddress')
  );

  algorandAccountData: Observable<AccountData> =
    this.sessionQuery.algorandAccountData.pipe(filterNilValue());

  constructor(
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private sessionAlgorandService: SessionAlgorandService,
    public sessionQuery: SessionQuery,
    private loadingCtrl: LoadingController,
    private notification: SwalHelper
  ) {}

  ngOnInit() {}

  async onPaymentSubmitted({
    amount,
    option: { receiverAddress },
  }: Payment): Promise<void> {
    if (amount.assetInfo.assetSymbol !== 'ALGO') {
      panic('PayPage.onPaymentSubmitted: expected ALGO, got:', amount);
    }

    const amountInAlgos = amount.amount;
    const confirmation = await withLoadingOverlayOpts(
      this.loadingCtrl,
      { message: 'Confirming Transaction' },
      () =>
        this.sessionAlgorandService.sendAlgos(receiverAddress, amountInAlgos)
    );

    this.notifySuccess(
      `${formatAssetAmount(amount)} ${formatAssetSymbol(amount)}`,
      receiverAddress,
      confirmation.txId,
      new Date()
    );
  }

  notifySuccess(
    amount: string,
    address: string,
    txid: string,
    timestamp: Date
  ) {
    this.notification.swal
      .fire({
        icon: 'success',
        titleText: 'Money sent!',
        text: 'Your money was sent successfully.',
        html: `<div >
              <h2 class="text-primary font-bold">${amount}</h2>
              <p class="text-xs">${address}</p>
              <small>Completed on ${timestamp.toLocaleString()}</small>
            </div>`,
        confirmButtonText: 'DONE',
        footer: `<a href="https://testnet.algoexplorer.io/tx/${txid}" target="_blank" >TxID</a>`,
      })
      .then(({ isConfirmed }) => {
        if (isConfirmed) {
          this.navCtrl.navigateRoot('wallet');
        }
      });
  }
}
