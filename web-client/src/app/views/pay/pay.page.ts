import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { LoadingController, NavController } from '@ionic/angular';
import { createMask } from '@ngneat/input-mask';
import { Algos } from 'src/app/services/algosdk.utils';
import { SessionAlgorandService } from 'src/app/state/session-algorand.service';
import { SessionQuery } from 'src/app/state/session.query';
import { defined } from 'src/app/utils/errors/panic';
import { withLoadingOverlayOpts } from 'src/app/utils/loading.helpers';
import { SwalHelper } from 'src/app/utils/notification/swal-helper';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-pay',
  templateUrl: './pay.page.html',
  styleUrls: ['./pay.page.scss'],
})
export class PayPage implements OnInit {
  wallet!: string;
  paymentForm: FormGroup;
  currencyInputMask = createMask({
    alias: 'numeric',
    groupSeparator: ',',
    digits: 2,
    digitsOptional: false,
    prefix: 'R ',
    placeholder: '0',
    autoUnmask: true,
    allowMinus: false,
  });

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private sessionAlgorandService: SessionAlgorandService,
    public sessionQuery: SessionQuery,
    private loadingCtrl: LoadingController,
    private notification: SwalHelper
  ) {
    this.paymentForm = this.formBuilder.group(
      {
        amount: [0, Validators.compose([Validators.required])],
      },
      { validators: this.validateAmount.bind(this) }
    );
  }

  get f() {
    return this.paymentForm.controls;
  }

  validateAmount(control: AbstractControl): ValidationErrors | null {
    const amount = Number(control.get('amount')?.value);

    const balance: Algos | undefined =
      this.sessionQuery.getAlgorandBalanceInAlgos();

    return amount === 0 || amount > (balance ?? 0)
      ? { insufficient: true }
      : null;
  }

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      console.log(params);
      this.wallet = params.receiverAddress;
    });
  }

  async onSubmit() {
    this.paymentForm.markAllAsTouched();
    if (this.paymentForm.valid) {
      // Convert the entered amount from display decimals to asset units.
      const amount =
        parseFloat(this.paymentForm.controls.amount.value) *
        10 ** defined(environment.defaultAlgorandAssetDecimals);

      console.log('PayPage.onSubmit: sending', { amount });

      const confirmation = await withLoadingOverlayOpts(
        this.loadingCtrl,
        { message: 'Confirming Transaction' },
        () =>
          this.sessionAlgorandService.sendAssetFunds(
            defined(environment.defaultAlgorandAssetId),
            this.wallet,
            amount
          )
      );
      this.notifySuccess(
        // TODO(Pi): Use asset unit, rather than 'R'
        'R' + amount,
        this.wallet,
        confirmation.txId,
        new Date()
      );
      //TODO: ()=>{send payment}
      //TODO: Display notification
      // if (success) {
      //   this.notifySuccess(
      //     'R250',
      //     'G6AIRDAJFSBXNFBHLQ2F5JLZJ6EYYYLDZSCDHUQUB2YUG5QO4ZB4VNAL7I',
      //     'LNJH2Q2BYMV7KMMFMEEUCKIW6C3HPBOL4ARZBPPE2OBVVDPNVN6A',
      //     new Date()
      //   );
      // } else {
      //   this.notifyError(errorMessage);
      // }
    } else if (this.paymentForm.errors?.insufficient) {
      this.notifyError(
        Number(this.f.amount.value) === 0
          ? 'You cannot send 0'
          : 'Insufficient funds'
      );
    }
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
        text: `Your money was sent successfully.`,
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

  notifyError(text: string) {
    this.notification.swal
      .fire({
        icon: 'error',
        titleText: 'Oops!',
        text,
        confirmButtonText: 'RETRY',
      })
      .then(({ isConfirmed, isDismissed }) => {
        if (isConfirmed) {
          //TODO: retry payment
        } else if (isDismissed) {
          this.navCtrl.navigateRoot('wallet');
        }
      });
  }
}
