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
import { withLoadingOverlayOpts } from 'src/app/utils/loading.helpers';
import { SwalHelper } from 'src/app/utils/notification/swal-helper';

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
      const confirmation = await withLoadingOverlayOpts(
        this.loadingCtrl,
        { message: 'Confirming Transaction' },
        () =>
          this.sessionAlgorandService.sendAlgos(
            this.wallet,
            this.paymentForm.controls.amount.value
          )
      );

      this.notifySuccess(
        'R' + this.paymentForm.controls.amount.value,
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
