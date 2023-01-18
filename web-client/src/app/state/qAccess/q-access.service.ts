import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { QAccessStore } from './q-access.store';
import { Preferences} from '@capacitor/preferences';
import { guid } from '@datorama/akita';
import { QAccess } from './q-access.model';

@Injectable({ providedIn: 'root' })
export class QAccessService {

  constructor(private quickAccessStore: QAccessStore) { }

  addWalletAddress(address: string, preferedName: string){
    Preferences.set({
      key: address,
      value: preferedName
    })
    this.fetchWalletAddresses()
  };

  async loadPreferedName(walletAddress: string){
    const result = await Preferences.get({
      key: walletAddress,
    });
    return result.value;
  };

  async loadWalletAddresses(): Promise<string[]>{
    let fetchedwalletAdresses: string[] = [];
    try{
      const walletAddresses = (await Preferences.keys()).keys;
      fetchedwalletAdresses = walletAddresses;
    } catch (err){
      console.log(err);
    }
    return fetchedwalletAdresses
  };

  async fetchPreferedName(walletAddress: string){
    const preferedName = this.loadPreferedName(walletAddress);
    const data = await preferedName.then((data) => {return data});
    return data;
  };

  async fetchWalletAddresses(){
    let fetchWalletAddresses = await this.loadWalletAddresses();
    let QuickAcess: QAccess;
    for (let walletAddress of fetchWalletAddresses) {
      let getPreferedName = await this.fetchPreferedName(walletAddress);
      const id = guid()
      QuickAcess = {
        id,
        walletAddress: walletAddress,
        preferedName: getPreferedName
      };
      this.quickAccessStore.add({
        id,
        walletAddress: walletAddress,
        preferedName: getPreferedName
      });
    };
  };

  deleteAddress(walletAddress: string){
    return Preferences.remove({
      key: walletAddress,
    });
  };

}
