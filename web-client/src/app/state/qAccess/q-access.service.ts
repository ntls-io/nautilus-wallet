import { Injectable, OnDestroy } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { Subscription } from 'rxjs';
import { SwalHelper } from 'src/app/utils/notification/swal-helper';
import { QAccessQuery } from './q-access.query';
import { QAccessStore } from './q-access.store';

@Injectable({ providedIn: 'root' })
export class QAccessService implements OnDestroy {
  walletAddresses!: string[];
  subscription!: Subscription;
  rememberWalletAddress!: boolean;

  constructor(
    private quickAccessStore: QAccessStore,
    private quickAccessQuery: QAccessQuery,
    public notification: SwalHelper
  ) {
    this.subscription = this.quickAccessQuery.walletAddresses$.subscribe(
      (walletAddresses) => (this.walletAddresses = walletAddresses)
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  setRememberWalletAddress(value: boolean) {
    this.rememberWalletAddress = value;
  }

  getRememberWalletAddress() {
    return this.rememberWalletAddress;
  }

  walletAddressExists(walletAddress: string | undefined): boolean {
    walletAddress = walletAddress !== undefined ? walletAddress : '';
    return this.walletAddresses.includes(walletAddress);
  }

  addWalletAddress(address: string, preferedName: string) {
    Preferences.set({
      key: address,
      value: preferedName,
    });
    this.fetchWalletAddresses();
  }

  async loadPreferedName(walletAddress: string) {
    const result = await Preferences.get({
      key: walletAddress,
    });
    return result.value;
  }

  async loadWalletAddresses(): Promise<string[]> {
    let fetchedwalletAdresses: string[] = [];
    try {
      const walletAddresses = (await Preferences.keys()).keys;
      fetchedwalletAdresses = walletAddresses;
    } catch (err) {
      console.log(err);
    }
    return fetchedwalletAdresses;
  }

  async fetchPreferedName(walletAddress: string) {
    const preferedName = this.loadPreferedName(walletAddress);
    const data = await preferedName.then((result) => result);
    return data;
  }

  async fetchWalletAddresses() {
    const fetchWalletAddresses = await this.loadWalletAddresses();
    for (const walletAddress of fetchWalletAddresses) {
      const getPreferedName = await this.fetchPreferedName(walletAddress);
      this.quickAccessStore.add({
        walletAddress,
        preferedName: getPreferedName,
      });
    }
  }

  async deleteAddress(walletAddress: string) {
    await Preferences.remove({
      key: walletAddress,
    });

    this.quickAccessStore.remove(walletAddress);
  }

  async saveQuickAccess(
    address: string | undefined,
    promptForNickname: boolean = true
  ) {
    const saveWalletAddress: string = address !== undefined ? address : '';
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
          inputValidator: (value) => {
            if (!value) {
              return 'Wallet nickname cannot be empty';
            } else {
              return null;
            }
          },
        });
        if (result.isConfirmed) {
          preferedName = result.value;
        } else if (result.isDismissed) {
          return;
        }
      }
      this.addWalletAddress(saveWalletAddress, preferedName);
      await this.notification.swal.fire({
        icon: 'success',
        text: 'Your Wallet Address has been saved!',
      });
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
