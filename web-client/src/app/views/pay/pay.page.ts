import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { filterNilValue } from '@datorama/akita';
import { LoadingController, NavController } from '@ionic/angular';
import { Observable, pluck } from 'rxjs';
import { Payment } from 'src/app/components/pay/pay.component';
import { SessionAlgorandService } from 'src/app/state/session-algorand.service';
import { SessionQuery } from 'src/app/state/session.query';
import { isAssetAmountAlgo } from 'src/app/utils/assets/assets.algo';
import {
  convertFromAssetAmountAsaToLedger,
  isAssetAmountAsa,
} from 'src/app/utils/assets/assets.algo.asa';
import {
  AssetAmount,
  formatAssetAmount,
  formatAssetSymbol,
} from 'src/app/utils/assets/assets.common';
import { panic } from 'src/app/utils/errors/panic';
import { withLoadingOverlayOpts } from 'src/app/utils/loading.helpers';
import { SwalHelper } from 'src/app/utils/notification/swal-helper';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-pay-page',
  templateUrl: './pay.page.html',
  styleUrls: ['./pay.page.scss'],
})
export class PayPage implements OnInit {
  senderName: Observable<string> = this.sessionQuery.wallet.pipe(
    filterNilValue(),
    pluck('owner_name')
  );

  receiverAddress: Observable<string> = this.route.queryParams.pipe(
    pluck('receiverAddress')
  );

  algorandBalances: Observable<AssetAmount[]> =
    this.sessionQuery.algorandBalances;

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
    const confirmation = await withLoadingOverlayOpts(
      this.loadingCtrl,
      { message: 'Confirming Transaction' },
      () => {
        if (isAssetAmountAlgo(amount)) {
          return this.sessionAlgorandService.sendAlgos(
            receiverAddress,
            amount.amount
          );
        } else if (isAssetAmountAsa(amount)) {
          const { amount: amountInLedgerUnits, assetId } =
            convertFromAssetAmountAsaToLedger(amount);
          return this.sessionAlgorandService.sendAssetFunds(
            assetId,
            receiverAddress,
            amountInLedgerUnits
          );
        } else {
          throw panic('PayPage.onPaymentSubmitted: unexpected amount', {
            amount,
          });
        }
      }
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
    txId: string,
    timestamp: Date
  ) {
    const txIdHtml = environment.algorandTransactionUrlPrefix
      ? `<a href="${environment.algorandTransactionUrlPrefix}${txId}" target="_blank" >${txId}</a>`
      : `${txId}`;
    this.notification.swal
      .fire({
        icon: 'success',
        titleText: 'Money sent!',
        text: 'Your money was sent successfully.',
        html: `<div >
              <h2 class="text-primary font-bold">${amount}</h2>
              <p class="text-xs"><b>Receiver:</b> ${address}</p>
              <p class="text-xs"><b>Transaction ID:</b> ${txIdHtml}</p>
              <p class="text-xs">Completed on ${timestamp.toLocaleString()}</p>
            </div>`,
        confirmButtonText: 'DONE',
      })
      .then(({ isConfirmed }) => {
        if (isConfirmed) {
          this.navCtrl.navigateRoot('wallet');
        }
      });
  }
}
