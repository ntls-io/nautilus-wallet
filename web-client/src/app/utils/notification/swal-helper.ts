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

   showIncorrectOTPWarning() {
    this.swal.fire({
      icon: 'warning',
      title: 'Incorrect OTP',
      text: 'You entered an incorrect OTP. Please try again.',
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
