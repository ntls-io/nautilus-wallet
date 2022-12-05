import { ErrorHandler, Injectable, NgZone } from '@angular/core';
import { NavController } from '@ionic/angular';
import * as Sentry from '@sentry/angular';
import { SwalHelper } from '../notification/swal-helper';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  constructor(
    private zone: NgZone,
    private notification: SwalHelper,
    private navCtrl: NavController
  ) {}

  handleError(error: Error) {
    if (error.message.includes('setOptions failed')) {
      // XXX: Work around: Uncaught (in promise) DOMException: setOptions failed #297
      //      https://github.com/zxing-js/ngx-scanner/issues/297
      console.warn('GlobalErrorHandler ignoring:', error);
      return;
    }

    if (
      error.message.includes('SessionService.signTransaction: invalid auth')
    ) {
      console.warn('GlobalErrorHandler:', error);
      this.zone.run(
        async () =>
          await this.notification.swal
            .fire({
              icon: 'error',
              text: 'Incorrect PIN',
            })
            .then(() => {
              // XXX: See also modal closing code in LandingPage
              this.navCtrl.navigateRoot('/pull');
            })
      );
      return;
    }

    console.error('GlobalErrorHandler:', error);
    Sentry.captureException(error);
    this.zone.run(
      async () =>
        await this.notification.swal
          .fire({
            icon: 'error',
            text: 'Unexpected Error Occurred',
          })
          .then(() => {
            // XXX: See also modal closing code in LandingPage
            this.navCtrl.navigateRoot('');
          })
    );
  }
}
