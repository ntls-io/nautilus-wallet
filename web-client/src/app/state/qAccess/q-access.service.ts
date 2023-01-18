import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { guid } from '@datorama/akita';
import { QAccess } from './q-access.model';
import { QAccessStore } from './q-access.store';

@Injectable({ providedIn: 'root' })
export class QAccessService {
  constructor(private quickAccessStore: QAccessStore) {}

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
}
