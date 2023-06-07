import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  LoadingController,
  ModalController,
  NavController,
} from '@ionic/angular';
import { SessionService } from 'src/app/state/session.service';
import { withLoadingOverlayOpts } from 'src/app/utils/loading.helpers';
import { SwalHelper } from 'src/app/utils/notification/swal-helper';
import { StartSgxSession } from 'src/schema/session';
import { WalletAccessPage } from '../wallet-access/wallet-access.page';

@Component({
  selector: 'app-pin-reset',
  templateUrl: './pin-reset.page.html',
  styleUrls: ['./pin-reset.page.scss'],
})
export class PinResetPage implements OnInit {
  wallet_id: string | undefined;
  isBusySaving = false;

  constructor(
    private loadingCtrl: LoadingController,
    private modalCtrl: ModalController,
    public sessionService: SessionService,
    private notification: SwalHelper,
    private navCtrl: NavController,
    private walletAccessPage: WalletAccessPage,
    private router: Router
  ) {
    this.wallet_id =
      this.router.getCurrentNavigation()?.extras.state?.wallet_id;
  }

  ngOnInit() {}

  async dismiss() {
    this.modalCtrl.dismiss();
  }

  async onSubmit(answers: Map<string, string>) {
    this.isBusySaving = true;
    const wallet_id = this.wallet_id;
    if (wallet_id) {
      const newSession = StartSgxSession.new(wallet_id);
      const client_pk = newSession.our_public_key();

      const initialResult = await this.checkAnswers(
        wallet_id,
        answers,
        client_pk
      );

      if ('InvalidAuth' in initialResult) {
        this.notification.showIncorrectSecutiyAnswers();
      } else if ('Success' in initialResult) {
        try {
          const password = await this.newPin();

          if (password) {
            const pinResetResult = await this.resetPin(
              wallet_id,
              password,
              answers
            );

            if ('Reset' in pinResetResult) {
              this.notification.showPinResetSuccessNotification();
              this.navCtrl.navigateRoot('/');
            } else {
              this.notification.showUnexpectedFailureWarning();
              this.navCtrl.navigateRoot('/');
            }
          }
        } catch (err) {
          console.log('catch err: ' + err);
        }
      } else {
        this.notification.showUnexpectedFailureWarning();
        this.navCtrl.navigateRoot('/');
      }
      this.isBusySaving = false;
    }
  }

  async checkAnswers(
    wallet_id: string,
    answers: Map<string, string>,
    client_pk: Uint8Array
  ) {
    return await withLoadingOverlayOpts(
      this.loadingCtrl,
      { message: 'Checking your answers...' },
      async () =>
        await this.sessionService.startPinReset(wallet_id, answers, client_pk)
    );
  }

  async newPin() {
    const { value: password, dismiss: cancelReset } =
      await this.notification.swal.fire({
        titleText: 'Enter new PIN.',
        input: 'password',
        inputPlaceholder: 'Enter your PIN here',
        inputAttributes: {
          autocomplete: 'off',
          autocorrect: 'off',
        },
        preConfirm: (pin) => {
          if (isNaN(pin)) {
            this.notification.swal.showValidationMessage(
              'Please enter digits only (0-9).'
            );
            return false;
          }
          if (pin.length < 4) {
            this.notification.swal.showValidationMessage(
              'PIN should have a minimum of 4 digits.'
            );
            return false;
          }
          return pin;
        },
      });

    if (cancelReset) {
      this.isBusySaving = false;
      return null;
    }

    return password;
  }

  async resetPin(
    wallet_id: string,
    password: string,
    answers: Map<string, string>
  ) {
    return await withLoadingOverlayOpts(
      this.loadingCtrl,
      { message: 'Resetting your PIN...' },
      async () =>
        await this.sessionService.pinReset(wallet_id, password, answers)
    );
  }
}
