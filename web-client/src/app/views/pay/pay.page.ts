import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { LoadingController, NavController } from '@ionic/angular';
import { WalletService } from 'src/app/services/wallet/wallet.service';
import { SessionQuery } from 'src/app/stores/session/session.query';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pay',
  templateUrl: './pay.page.html',
  styleUrls: ['./pay.page.scss'],
})
export class PayPage implements OnInit {
  wallet!: string;
  paymentForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private walletService: WalletService,
    private sessionQuery: SessionQuery,
    private loadingCtrl: LoadingController
  ) {
    this.paymentForm = this.formBuilder.group({
      amount: [0, Validators.compose([Validators.required])],
    });
  }

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      console.log(params);
      this.wallet = params.recieverAddress;
    });
  }

  async onSubmit() {
    this.paymentForm.markAllAsTouched();
    if (this.paymentForm.valid) {
      const loading = await this.loadingCtrl.create();
      loading.present();
      console.log(this.paymentForm.controls.amount.value);
      await this.walletService.sendFunds(
        this.wallet,
        this.paymentForm.controls.amount.value
      );
      loading.dismiss();

      this.notifySuccess(
        'R' + this.paymentForm.controls.amount.value,
        this.wallet,
        this.sessionQuery.getValue().transactionId,
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
    Swal.fire({
      icon: 'success',
      titleText: 'Money sent!',
      text: `Your money was sent successfully.`,
      html: `<div >
              <h2 class="text-primary font-bold">${amount}</h2>
              <p class="text-xs">${address}</p>
              <small>Completed on ${timestamp.toLocaleString()}</small>
            </div>`,
      confirmButtonColor: 'var(--ion-color-primary)',
      confirmButtonText: 'DONE',
      customClass: {
        confirmButton: 'w-1/2 !rounded-full',
        title: 'font-nasalization',
      },
      backdrop: true,
      heightAuto: false,
      allowOutsideClick: false,
      footer: `<a href="https://testnet.algoexplorer.io/tx/${txid}" target="_blank" >TxID</a>`,
    }).then(({ isConfirmed }) => {
      if (isConfirmed) {
        this.navCtrl.navigateRoot('wallet');
      }
    });
  }

  notifyError(text: string) {
    Swal.fire({
      icon: 'error',
      titleText: 'Oops!',
      text,
      confirmButtonColor: 'var(--ion-color-primary)',
      confirmButtonText: 'RETRY',
      customClass: {
        confirmButton: 'w-1/2 !rounded-full',
        title: 'font-nasalization',
      },
      showCloseButton: true,
      backdrop: true,
      heightAuto: false,
      allowOutsideClick: false,
    }).then(({ isConfirmed, isDismissed }) => {
      if (isConfirmed) {
        //TODO: retry payment
      } else if (isDismissed) {
        this.navCtrl.navigateRoot('wallet');
      }
    });
  }
}
