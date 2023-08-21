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

  showDeletedWalletError() {
    this.swal.fire({
      icon: 'error',
      title: 'Transaction Failed',
      text: 'You cannot send funds to a wallet that has been deleted.',
    });
  }

  showDeletedWalletErrorPull() {
    this.swal.fire({
      icon: 'error',
      title: 'Transaction Failed',
      text: 'You cannot pull funds from a wallet that has been deleted.',
    });
  }

  showDeleteAccountError() {
    this.swal.fire({
      icon: 'error',
      title: 'Transaction Failed',
      text: 'Wallet cannot be deleted currently. Please try again later.',
    });
  }

  showCurrencyNotOptIn() {
    this.swal.fire({
      icon: 'error',
      title: 'Transaction Failed',
      text: 'The receiver needs to opt into this currency first, before trying again.',
    });
  }

  showCurrencyNotOptInPull() {
    this.swal.fire({
      icon: 'error',
      title: 'Transaction Failed',
      text: 'The receiver may have insufficient funds or has not opted into this currency.',
    });
  }

  showInsufficientFunds() {
    const reserveAmount = 10;
    this.swal.fire({
      icon: 'error',
      title: 'Insufficient Funds',
      text: `Your transaction exceeds the minimum reserve of ${reserveAmount} XRP. Please adjust the amount and try again.`,
    });
  }

  showInsufficientFundsPullPayment() {
    this.swal.fire({
      icon: 'error',
      title: 'Insufficient Funds',
      text: 'There are insufficient funds from the wallet you are pulling from.',
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
