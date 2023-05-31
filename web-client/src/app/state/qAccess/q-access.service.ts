import { Injectable } from '@angular/core';
import { SwalHelper } from 'src/app/utils/notification/swal-helper';
import { QAccessQuery } from './q-access.query';
import { QAccessStore } from './q-access.store';

@Injectable({ providedIn: 'root' })
export class QAccessService {
  rememberWalletAddress!: boolean;

  constructor(
    private quickAccessStore: QAccessStore,
    private quickAccessQuery: QAccessQuery,
    public notification: SwalHelper
  ) {
    const legacies = this.quickAccessQuery.getAll({
      filterBy: (entity) => typeof entity?.id === 'string',
    });

    if (legacies?.length) {
      legacies.forEach(({ walletAddress, preferedName, id }) => {
        this.quickAccessStore.upsert(walletAddress, {
          walletAddress,
          preferedName,
        });
        this.quickAccessStore.remove(id);
      });
    }
  }

  setRememberWalletAddress(value: boolean) {
    this.rememberWalletAddress = value;
  }

  getRememberWalletAddress() {
    return this.rememberWalletAddress;
  }

  async addWalletAddress(walletAddress: string, preferedName: string) {
    this.quickAccessStore.upsert(walletAddress, {
      walletAddress,
      preferedName,
    });
    await this.notification.swal.fire({
      icon: 'success',
      text: 'Your Wallet Address has been saved!',
    });
  }

  deleteAddress(walletAddress: string) {
    this.quickAccessStore.remove(walletAddress);
  }

  async saveQuickAccess(
    address: string | undefined,
    promptForNickname: boolean = true
  ) {
    const walletAddress = address ?? '';
    try {
      let preferedName = '';
      if (promptForNickname) {
        const result = await this.notification.swal.fire({
          titleText: 'Enter Wallet Nickname.',
          input: 'text',
          inputAttributes: {
            autocapitalize: 'off',
            autocorrect: 'off',
          },
          focusConfirm: false,
          confirmButtonText: 'Save',
          showCancelButton: true,
          reverseButtons: true,
          inputValidator: (value) =>
            value ? null : 'Wallet nickname cannot be empty',
        });
        if (result.isConfirmed) {
          preferedName = result.value;
        } else if (result.isDismissed) {
          return;
        }
      }
      this.addWalletAddress(walletAddress, preferedName);
    } catch (error) {
      await this.notification.swal.fire({
        icon: 'error',
        text: 'An unexpected error occured when saving your wallet address',
        toast: true,
        position: 'bottom',
      });
    }
  }
}
