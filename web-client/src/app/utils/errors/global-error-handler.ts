import { ErrorHandler, Injectable, NgZone } from '@angular/core';
import { SwalHelper } from '../notification/swal-helper';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  constructor(private zone: NgZone, private notification: SwalHelper) {}

  handleError(error: Error) {
    this.zone.run(() =>
      this.notification.swal.fire({
        icon: 'error',
        text: error.message || 'Undefined client error',
      })
    );
  }
}
