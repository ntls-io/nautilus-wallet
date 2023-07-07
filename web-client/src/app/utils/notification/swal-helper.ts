import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class SwalHelper {
  public swal = Swal.mixin({
    confirmButtonColor: 'var(--ion-color-primary)',
    customClass: {
      actions: '!w-full',
      confirmButton: 'w-1/2 !rounded-full',
      cancelButton: 'w-1/3 !rounded-full',
      title: 'font-nasalization',
    },
    backdrop: true,
    heightAuto: false,
    allowOutsideClick: false,
  });

  showInvalidAddress() {
    this.swal.fire({
      icon: 'warning',
      title: 'Invalid Address',
      text: 'Please enter a valid wallet address.',
    });
  }

  showIncorrectOTPWarning() {
    this.swal.fire({
      icon: 'warning',
      title: 'Incorrect OTP',
      text: 'You entered an incorrect OTP. Please try again.',
    });
  }

  showIncorrectSecutiyAnswers() {
    this.swal.fire({
      icon: 'warning',
      titleText: 'Incorrect Answers!',
      text: 'Authentication failed, please ensure that the answers to the security questions are correct.',
    });
  }

  showPinResetSuccessNotification() {
    this.swal.fire({
      icon: 'success',
      titleText: 'Pin Reset Successfully!',
      text: 'Your PIN has been reset.',
    });
  }

  showRecurringPaySuccessNotification() {
    this.swal.fire({
      icon: 'success',
      titleText: 'Recurring Payment Scheduled',
      text: 'You have successfully scheduled a recurring payment.',
    });
  }

  showUnexpectedFailureWarning() {
    this.swal.fire({
      icon: 'warning',
      title: 'Unexpected Failure',
      text: 'An unexpected error occurred. Please try again.',
    });
  }
}
