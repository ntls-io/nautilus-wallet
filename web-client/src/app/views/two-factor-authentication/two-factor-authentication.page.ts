import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { LoadingController, ToastController } from '@ionic/angular';
import { IonIntlTelInputValidators } from 'ion-intl-tel-input';
import { SessionService } from 'src/app/state/session.service';
import { withLoadingOverlayOpts } from 'src/app/utils/loading.helpers';
import { SessionQuery } from 'src/app/state/session.query';
import { SwalHelper } from 'src/app/utils/notification/swal-helper';


@Component({
  selector: 'app-two-factor-authentication',
  templateUrl: './two-factor-authentication.page.html',
  styleUrls: ['./two-factor-authentication.page.scss'],
})
export class TwoFactorAuthenticationPage implements OnInit {
  /** @see showPinEntryModal */
  @Input() isPinEntryOpen = false;
  isOpening = false;
  registrationForm: FormGroup;
  walletId: string | undefined;

  actionItems = [
    {
      title: 'Set Triggers',
      icon: 'key',
      path: '/triggers',
      disabled: false,
    },
  ];


  constructor(
    private formBuilder: FormBuilder,
    private loadingCtrl: LoadingController,
    private sessionService: SessionService,
    private sessionQuery: SessionQuery,
    private notification: SwalHelper,
    private toastCtrl: ToastController) {
    this.registrationForm = this.generateFormGroup();
    this.sessionQuery.walletId.subscribe(wallet => this.walletId = wallet);
  }

  get f() {
    return this.registrationForm.controls;
  }

  generateFormGroup(): FormGroup {
    return this.formBuilder.group({
      mobile: [
        '',
        Validators.compose([
          Validators.required,
          IonIntlTelInputValidators.phone,
        ]),
      ],
    });
  }

  ngOnInit() {
  }

  /** Show the PIN entry modal. */
  showPinEntryModal(): void {
    this.isPinEntryOpen = true;
  }

  onSubmit() {
    if (this.registrationForm.valid) {
      this.showPinEntryModal();
    }
  }

  /** User confirmed PIN: attempt to open wallet. */
  async onPinConfirmed(pin: string): Promise<void> {
      const walletId = this.walletId ? this.walletId : '';
      const phoneNumber =
        this.registrationForm.controls.mobile.value.internationalNumber
          .split(' ')
          .join('');
      const updateOtpPhoneNumberResult = await withLoadingOverlayOpts(
        this.loadingCtrl,
        { message: 'Saving OTP Number…' },
        async () => await this.sessionService.updateOtpPhoneNumber(walletId,phoneNumber,pin)
      );
      if ('Updated' in updateOtpPhoneNumberResult) {
        this.notification.swal.fire({
          icon: 'success',
          title: 'OTP Phone Number Updated',
          text: 'The Phone Number for OTP has been updated successfully.',
        });

      } else if ('Failed' in updateOtpPhoneNumberResult) {
        await this.notification.swal.fire({
          icon: 'error',
          title: 'Incorrect PIN',
          text: 'Authentication failed, please ensure that the PIN provided is correct.',
        });
      } else {
        await this.notification.swal.fire({
          icon: 'error',
          title: 'Update OTP Phone Number Failed',
          text: 'There was an issue updating your phone number, please try again.',
        });
      }
   }

  onModalOpen(event: any) {
    if (event?.target?.type === 'button') {
      this.isOpening = true;
    }
  }

  async showSuccess(message: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 3000,
      color: 'success',
    });
  }

}

