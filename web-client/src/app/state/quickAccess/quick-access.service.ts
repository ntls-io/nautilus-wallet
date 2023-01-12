import { Injectable } from '@angular/core';
import { Preferences} from '@capacitor/preferences';

@Injectable({
  providedIn: 'root'
})
export class QuickAccessService {

  constructor() { }

  addWalletAddress(address: string, preferedName: string){
    return Preferences.set({
      key: address,
      value: preferedName
    });
  };

  async loadPreferedName(walletAddress: string){
    const result = await Preferences.get({
      key: walletAddress,
    });
    return result.value;
  };

  getWalletAddresses = Preferences.keys();

  async loadWalletAddresses(): Promise<string[]>{
    let fetchedwalletAdresses: string[] = [];
    try{
      const walletAddresses = (await this.getWalletAddresses).keys;
      fetchedwalletAdresses = walletAddresses;
    } catch (err){
      console.log(err);
    }
    return fetchedwalletAdresses
  };

  deleteAddress(walletAddress: string){
    return Preferences.remove({
      key: walletAddress,
    });
  };
}
