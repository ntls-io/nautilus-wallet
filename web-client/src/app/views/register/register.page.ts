import { Component, OnDestroy, ViewChild } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { IonIntlTelInputValidators } from 'ion-intl-tel-input';
import { checkTxResponseSucceeded } from 'src/app/services/xrpl.utils';
import { SessionXrplService } from 'src/app/state/session-xrpl.service';
import { SessionQuery } from 'src/app/state/session.query';
import { SessionService } from 'src/app/state/session.service';
import {
  AssetAmount,
  formatAssetAmount,
  formatAssetSymbol,
} from 'src/app/utils/assets/assets.common';
import { withLoadingOverlayOpts } from 'src/app/utils/loading.helpers';
import { SwalHelper } from 'src/app/utils/notification/swal-helper';
import { environment } from 'src/environments/environment';
import SwiperCore, { Pagination } from 'swiper';
import { SwiperComponent } from 'swiper/angular';
import * as xrpl from 'xrpl';

SwiperCore.use([Pagination]);

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnDestroy {
  @ViewChild('swiper', { static: false }) swiper?: SwiperComponent;
  registrationForm: FormGroup;
  numInputMask = '9999999999';
  isOpening = false;
  subscription$;

  constructor(
    private formBuilder: FormBuilder,
    private sessionService: SessionService,
    private router: Router,
    private sessionQuery: SessionQuery,
    private sessionXrplService: SessionXrplService,
    private loadingCtrl: LoadingController,
    private notification: SwalHelper
  ) {
    this.registrationForm = this.generateFormGroup();

    this.subscription$ = this.f.pin.valueChanges.pipe().subscribe(() => {
      this.f.confirmPin.updateValueAndValidity();
    });
  }

  get f() {
    return this.registrationForm.controls;
  }

  generateFormGroup(): FormGroup {
    return this.formBuilder.group({
      firstName: [
        '',
        Validators.compose([Validators.minLength(2), Validators.required]),
      ],
      lastName: [
        '',
        Validators.compose([Validators.minLength(2), Validators.required]),
      ],
      mobile: [
        '',
        Validators.compose([
          Validators.required,
          IonIntlTelInputValidators.phone,
        ]),
      ],
      pin: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(10),
        ]),
      ],
      confirmPin: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(10),
          this.matchValues('pin'),
        ]),
      ],
    });
  }

  validateForm() {
    this.registrationForm.markAllAsTouched();
    if (this.registrationForm.valid) {
      this.swiper?.swiperRef?.slideNext();
    }
  }

  async onSubmit(answers: Map<string, string>): Promise<void> {
    /* istanbul ignore next TODO */
    if (this.registrationForm.valid) {
      const phoneNumber =
        this.registrationForm.controls.mobile.value.internationalNumber
          .split(' ')
          .join('');

      const { firstName, lastName, pin } = this.registrationForm.value;

      try {
        const wallet_id: string = await this.sessionService.createWallet(
          firstName + ' ' + lastName,
          pin,
          answers,
          phoneNumber
        );

        // Autofund the account on creation
        const autoFundBool = environment.autofundXrp;
        if (autoFundBool) {
          const result = await withLoadingOverlayOpts(
            this.loadingCtrl,
            { message: 'Creating Wallet' },
            () =>
              this.sessionXrplService.sendAutoFunds(
                wallet_id
              )
          );
        }
        this.router.navigate(['/print-wallet']);
      } catch (err) {
        this.notification.swal.fire({
          icon: 'error',
          titleText: 'Wallet Not Created!',
          text: 'There was a problem creating your wallet, please try again.',
          confirmButtonText: 'DONE',
        });
        this.router.navigate(['/']);
      }
    }
  }

  matchValues(
    matchTo: string
  ): (arg0: AbstractControl) => ValidationErrors | null {
    return (control: AbstractControl): ValidationErrors | null =>
      !!control?.parent?.value &&
      control?.value ===
        (control.parent.controls as { [key: string]: AbstractControl })[matchTo]
          .value
        ? null
        : { mismatch: true };
  }

  onModalOpen(event: any) {
    if (event?.target?.type === 'button') {
      this.isOpening = true;
    }
  }

  ngOnDestroy() {
    this.subscription$.unsubscribe();
  }

  protected async notifyResult(
    result: { xrplResult: xrpl.TxResponse },
    amount: AssetAmount,
    receiverAddress: string
  ): Promise<void> {
    if ('xrplResult' in result) {
      const { xrplResult: txResponse } = result;
      const { succeeded, resultCode } = checkTxResponseSucceeded(txResponse);
      if (succeeded) {
        this.notifySuccess({
          amount: `${formatAssetAmount(amount)} ${formatAssetSymbol(amount)}`,
          address: receiverAddress,
          txId: txResponse.id.toString(),
          timestamp: new Date(),
        });
      } else {
        await this.notifyXrplFailure({ resultCode });
      }
    }
  }

  protected notifySuccess({
    amount,
    address,
    txId,
    timestamp,
    txUrlPrefix,
  }: {
    amount: string;
    address: string;
    txId: string;
    timestamp: Date;
    txUrlPrefix?: string;
  }): void {
    const txIdHtml = txUrlPrefix
      ? `<a href="${txUrlPrefix}${txId}" target="_blank" >${txId}</a>`
      : `${txId}`;
    this.notification.swal.fire({
      icon: 'success',
      titleText: 'Wallet Created!',
      html: `<div >
              Your wallet was successfully created.
              <p class="text-xs"><b>Address:</b> ${address}</p>
              <p class="text-xs"><b>Transaction ID:</b> ${txIdHtml}</p>
              <p class="text-xs">Completed on ${timestamp.toLocaleString()}</p>
            </div>`,
      confirmButtonText: 'DONE',
    });
  }

  protected async notifyXrplFailure({
    resultCode,
  }: {
    resultCode: xrpl.TransactionMetadata['TransactionResult'];
  }): Promise<void> {
    const categoryLocalError = resultCode.startsWith('tel');
    const categoryRetry = resultCode.startsWith('ter');
    const retryable = categoryLocalError || categoryRetry;

    await this.notification.swal.fire({
      icon: retryable ? 'warning' : 'error',
      titleText: 'Transaction failed',
      html: [
        ...(categoryLocalError ? ['<p>(Local error)</p>'] : []),
        ...(categoryRetry ? ['<p>(Retry possible)</p>'] : []),
        `<p>Result code: ${resultCode}</p>`,
        '<p>See <a href="https://xrpl.org/transaction-results.html" target="_blank">Transaction Results</a> for more details.</p>',
      ].join('\n'),
    });
  }
}
