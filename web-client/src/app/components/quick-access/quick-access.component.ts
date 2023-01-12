import { Component, OnInit } from '@angular/core';
import { QuickAccessService } from 'src/app/state/quickAccess';
import { saveAddress } from 'src/schema/entities';
import { QuickAccessStore } from 'src/app/state/quickAccess';

@Component({
  selector: 'app-quick-access',
  templateUrl: './quick-access.component.html',
  styleUrls: ['./quick-access.component.scss'],
})
export class QuickAccessComponent implements OnInit {

  displayWalletAddress: saveAddress[] = [];
  savedWalletAddresses: saveAddress[] = [];

  constructor(
    private quickAccessService: QuickAccessService,
    private quickAccessStore: QuickAccessStore) {}

  ngOnInit() {}

  displayWalletAdress = this.fetchWalletAddresses().then(
    (data) => {return this.savedWalletAddresses = data}
  );

  async fetchPreferedName(walletAddress: string){
    const preferedName = this.quickAccessService.loadPreferedName(walletAddress);
    const data = await preferedName.then((data) => {return data});
    return data;
  };

  async fetchWalletAddresses(){
    let fetchWalletAddresses = await this.quickAccessService.loadWalletAddresses();
    let QuickAcess: saveAddress[] = [];
    for (let walletAddress of fetchWalletAddresses) {
      let getPreferedName = await this.fetchPreferedName(walletAddress)
      QuickAcess.push({
        address: walletAddress,
        preferedName: getPreferedName
      })
    };
    return QuickAcess
};

  async deleteAddress(walletAddress: string){
    await this.quickAccessService.deleteAddress(walletAddress);
    console.log('Adress Deleted!');
  };

}
