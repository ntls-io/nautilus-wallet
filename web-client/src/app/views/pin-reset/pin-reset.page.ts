import { Component, OnInit } from '@angular/core';
import { LoadingController, NavController } from '@ionic/angular';
import { withLoadingOverlayOpts } from 'src/app/utils/loading.helpers';
import { ModalController } from '@ionic/angular';
import { SwalHelper } from 'src/app/utils/notification/swal-helper';
import { SessionService } from 'src/app/state/session.service';
import { StartSgxSession } from 'src/schema/session';
import { WalletAccessPage } from '../wallet-access/wallet-access.page';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pin-reset',
  templateUrl: './pin-reset.page.html',
  styleUrls: ['./pin-reset.page.scss'],
})
export class PinResetPage implements OnInit {

  wallet_id: string | undefined;

  constructor(
    private loadingCtrl: LoadingController,
    private modalCtrl: ModalController,
    public sessionService: SessionService,
    private notification: SwalHelper,
    private navCtrl: NavController,
    private walletAccessPage: WalletAccessPage,
    private router: Router) {
      this.wallet_id = this.router.getCurrentNavigation()?.extras.state?.wallet_id;
    }

  ngOnInit() {}

  async dismiss() {
    this.modalCtrl.dismiss();
  }


  async onSubmit(answers: Map<string, string>) {
    const wallet_id: string = this.wallet_id !== undefined
    ? this.wallet_id : '';
    const newSession = StartSgxSession.new(wallet_id);
    const client_pk = newSession.our_public_key();

    const initialResult = await withLoadingOverlayOpts(
      this.loadingCtrl,
      { message: 'Checking your answers...' },
      async () => await this.sessionService.startPinReset(wallet_id,answers,client_pk)
    );

    if ('InvalidAuth' in initialResult) {
      console.log(initialResult.InvalidAuth);
      this.notification.swal.fire({
        icon: 'warning',
        title: 'Incorrect Answers!',
        text: 'Authentication failed, please ensure that the answers to the security questions are correct.',
      });
      this.navCtrl.navigateRoot('/pin-reset');
    } else if('Success' in initialResult) {
        console.log(initialResult);
        try {
          const { value: password } = await this.notification.swal.fire({
              title: 'Enter new PIN.',
              input: 'password',
              inputPlaceholder: 'Enter your PIN here',
              inputAttributes: {
                autocomplete: 'off',
                minlength: '4',
                autocapitalize: 'off',
                autocorrect: 'off'
              }
            });
          const pinResetResult = await withLoadingOverlayOpts(
            this.loadingCtrl,
            { message: 'Resetting your PIN...' },
            async () => await this.sessionService.pinReset(wallet_id,password,answers)
          );
          if('Reset' in pinResetResult){
            this.notification.swal.fire({
              icon: 'success',
              title: 'Pin Reset Successfully!',
              text: 'Your PIN has been reset.',
            });
            this.navCtrl.navigateRoot('/');
          } else if('InvalidAuth' in pinResetResult) {
            console.log('pinResetResultError: InvalidAuth ' + pinResetResult.InvalidAuth);
            this.notification.swal.fire({
              icon: 'warning',
              title: 'Unexpected Failure',
              text: 'An unexpected error occured. Please try again.',
            });
            this.navCtrl.navigateRoot('/');
          } else {
            console.log(pinResetResult);
            this.notification.swal.fire({
              icon: 'warning',
              title: 'Unexpected Failure',
              text: 'An unexpected error occured. Please try again.',
            });
            this.navCtrl.navigateRoot('/');
          }
          } catch(err){
            console.log('catch err: ' + err);
          }
    } else if('NotFound' in initialResult){

    } else {
      console.log(initialResult.Failed);
      this.notification.swal.fire({
        icon: 'warning',
        title: 'Unexpected Failure',
        text: 'An unexpected error occured. Please try again.',
      });
      this.navCtrl.navigateRoot('/');
    }


  }
}
