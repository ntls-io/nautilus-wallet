import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { LoadingController, NavController } from '@ionic/angular';
import { createMask } from '@ngneat/input-mask';
import { WalletService } from 'src/app/services/wallet';
import { SessionQuery } from 'src/app/stores/session';
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
    prefix: 'XRP ',
    placeholder: '0',
    autoUnmask: true,
  });

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private walletService: WalletService,
    public sessionQuery: SessionQuery,
    private loadingCtrl: LoadingController,
    private notification: SwalHelper
  ) {
    this.paymentForm = this.formBuilder.group({
      amount: [0, Validators.compose([Validators.required])],
    });
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
      const loading = await this.loadingCtrl.create({
        message: 'Confirming Transaction',
      });
      loading.present();
      try {
        console.log(this.paymentForm.controls.amount.value);
        await this.walletService.sendFunds(
          this.wallet,
          this.paymentForm.controls.amount.value
        );
      } finally {
        loading.dismiss();
      }

      const { transactionId } = this.sessionQuery.getValue();

      this.notifySuccess(
        'XRP' + this.paymentForm.controls.amount.value,
        this.wallet,
        transactionId,
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
        text: `Your money was sent successfully.`,
        html: `<div >
              <h2 class="text-primary font-bold">${amount}</h2>
              <p class="text-xs">${address}</p>
              <small>Completed on ${timestamp.toLocaleString()}</small>
            </div>`,
        confirmButtonText: 'DONE',
        footer: `<a href="https://testnet.xrpl.org/transactions/${txid}" target="_blank" >TxID</a>`,
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
