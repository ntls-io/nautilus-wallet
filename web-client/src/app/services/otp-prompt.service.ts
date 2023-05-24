import { Injectable } from '@angular/core';
import { CapacitorHttp } from '@capacitor/core';
import { createUrlWith } from 'src/app/utils/http.helpers';
import { SessionQuery } from '../state/session.query';
import { SwalHelper } from '../utils/notification/swal-helper';

const headers = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
};

@Injectable({
  providedIn: 'root',
})
export class OtpPromptService {
  phone_number = this.sessionQuery.getValue().wallet?.phone_number || '';
  otp_phone_number =
    this.sessionQuery.getValue().wallet?.otp_phone_number || '';
  verificaion_sid = '';

  constructor(
    private notification: SwalHelper,
    private sessionQuery: SessionQuery
  ) {}

  async requestOTP() {
    const phoneNumberToSend = this.otp_phone_number || this.phone_number;
    this.sendOtp(phoneNumberToSend);
    const lastFourDigits = phoneNumberToSend?.slice(-4);
    const maskedPhoneNumber = `*** *** ${lastFourDigits}`;

    const { value: password } = await this.notification.swal.fire({
      titleText: 'Enter the OTP',
      text:
        'A one time pin has been sent to the number ending with ' +
        maskedPhoneNumber +
        '. Please enter the 6 digit code below.',
      input: 'password',
      confirmButtonText: 'Confirm',
      showCancelButton: true,
      showLoaderOnConfirm: true,
      reverseButtons: true,
    });

    return password;
  }

  async sendOtp(phone_number_otp: string | undefined) {
    const data = { phone_number: phone_number_otp };
    try {
      const response = await CapacitorHttp.post({
        headers,
        url: createUrlWith('otp/send-to-user'),
        data,
      });

      if (response.status === 200) {
        this.verificaion_sid = response.data.verification_sid;
      }
    } catch (error) {
      console.log(error);
    }
  }

  async checkOtp(otp_attempt: string) {
    const data = {
      otp: otp_attempt,
      verification_sid: this.verificaion_sid,
    };

    const checkOtpResult = await CapacitorHttp.post({
      headers,
      url: createUrlWith('otp/check-status'),
      data,
    });

    return checkOtpResult;
  }
}
