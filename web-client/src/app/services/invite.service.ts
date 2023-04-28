import { Injectable } from '@angular/core';
import { CapacitorHttp } from '@capacitor/core';
import { createUrlWith } from 'src/app/utils/http.helpers';
import { SwalHelper } from 'src/app/utils/notification/swal-helper';
import Swal from 'sweetalert2';

export interface Invite {
  code: string;
  redeemed: boolean;
  id: string;
}

const headers = {
  'Content-Type': 'application/json',
};

@Injectable({
  providedIn: 'root',
})
export class InviteService {
  constructor(private notification: SwalHelper) {}

  async getInvite(invite_code: string): Promise<Invite | undefined> {
    return await CapacitorHttp.get({
      url: createUrlWith('invite'),
      params: { invite_code },
    })
      .then(({ status, data }) => {
        if (status === 200) {
          return data;
        }
        if (status === 404) {
          throw new Error('Unrecognized invite code');
        }
        if (status === 422) {
          throw new Error('Invite code has already been redeemed.');
        }
        return undefined;
      })
      .catch((error) => {
        Swal.showValidationMessage(`Request failed: ${error}`);
      });
  }

  async redeemInvite(invite_id: string): Promise<void> {
    return await CapacitorHttp.post({
      headers,
      url: createUrlWith('invite/redeem'),
      data: { invite_id },
    })
      .then(({ status }) => {
        switch (status) {
          case 200:
            break;
          case 404:
            throw new Error('Failed to redeem invite');
          default:
            throw new Error('Unexecpected error occurred');
        }
      })
      .catch((error) => {
        this.notification.swal.fire({
          icon: 'error',
          titleText: 'Please try again',
          text: error,
        });
      });
  }
}
