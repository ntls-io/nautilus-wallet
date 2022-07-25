import { Injectable } from '@angular/core';
import { SwalHelper } from '../utils/notification/swal-helper';

@Injectable({
  providedIn: 'root',
})
export class PwService {
  constructor(private notification: SwalHelper) {}

  async requestOTP() {
    await this.notification.swal.fire({
      titleText: 'Enter the OTP',
      text: 'A one time pin has been sent to the number ending with *** *** 1234. Please enter the 4 digit code below',
      input: 'text',
      confirmButtonText: 'Confirm',
      showCancelButton: true,
      showLoaderOnConfirm: true,
      reverseButtons: true,
    });
  }
}
