import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { guid } from '@datorama/akita';
import { QAccess } from './q-access.model';
import { QAccessStore } from './q-access.store';
import { SwalHelper } from 'src/app/utils/notification/swal-helper';
import { QAccessQuery } from './q-access.query';
import { Subscription } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class QAccessService {

  walletAddresses!: string[];
  subscription!: Subscription;

  constructor(private quickAccessStore: QAccessStore,
              private quickAccessQuery: QAccessQuery,
              public notification: SwalHelper,) {
                this.subscription = this.quickAccessQuery.walletAddresses$.subscribe(
                  walletAddresses => this.walletAddresses = walletAddresses
                );
              }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  rememberWalletAddress: boolean = false;

  setRememberWalletAddress(value: boolean) {
    this.rememberWalletAddress = value;
  }

  getRememberWalletAddress() {
    return this.rememberWalletAddress;
  }

  walletAddressExists(walletAddress: string | undefined): boolean {
    // const { keys } = await Preferences.keys();
    walletAddress = walletAddress !== undefined ? walletAddress: '';
    // console.log(keys);
    console.log(this.walletAddresses);
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
    let quickAcess: QAccess;
    for (const walletAddress of fetchWalletAddresses) {
      const getPreferedName = await this.fetchPreferedName(walletAddress);
      const id = guid();
      quickAcess = {
        id,
        walletAddress,
        preferedName: getPreferedName,
      };
      this.quickAccessStore.add({
        id,
        walletAddress,
        preferedName: getPreferedName,
      });
    }
  }

  deleteAddress(walletAddress: string) {
    return Preferences.remove({
      key: walletAddress,
    });
  }

  async saveQuickAccess(address: string | undefined) {
    const saveWalletAddress: string =
      address !== undefined
        ? address
        : '';
    try {
      const result = await this.notification.swal.fire({
        titleText: 'Enter Wallet Nickname.',
        input: 'text',
        inputAttributes: {
          autocapitalize: 'off',
          autocorrect: 'off'
        },
        focusConfirm: false,
        confirmButtonText: 'Save Wallet Address',
        showCancelButton: true,
        reverseButtons: true,
      });
      if (result.isConfirmed) {
        const preferedName = result.value;
        this.addWalletAddress(
          saveWalletAddress,
          preferedName
        );
        await this.notification.swal.fire({
          icon: 'success',
          text: 'Your Wallet Address has been saved!',
        });
      }
    } catch (error) {
      console.log(error);
    }
  }
}
