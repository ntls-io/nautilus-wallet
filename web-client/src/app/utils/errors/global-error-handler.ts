import { ErrorHandler, Injectable, NgZone } from '@angular/core';
import { NavController } from '@ionic/angular';
import { SwalHelper } from '../notification/swal-helper';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  constructor(
    private zone: NgZone,
    private notification: SwalHelper,
    private navCtrl: NavController
  ) {}

  handleError(error: Error) {
    this.zone.run(
      async () =>
        await this.notification.swal
          .fire({
            icon: 'error',
            text: error.message || 'Undefined client error',
          })
          .then(() => {
            this.navCtrl.navigateRoot('');
          })
    );
  }
}
