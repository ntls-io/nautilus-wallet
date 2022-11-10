import { Component, Input, OnInit } from '@angular/core';
import { SearchService, WalletAddress} from '../../services/search.service';
import { Clipboard } from '@capacitor/clipboard';
import {showToast} from '../../utils/toast.helpers';
import {ToastController} from '@ionic/angular';

@Component({
  selector: 'app-search-wallet',
  templateUrl: './search-wallet.page.html',
  styleUrls: ['./search-wallet.page.scss'],
})
export class SearchWalletPage implements OnInit {
  @Input() name = '';
  @Input() phone_number = '';

  public Clipboard = Clipboard;
  result: WalletAddress | null | undefined;

  constructor(
    public searchService: SearchService,
    private toastCtrl: ToastController,
  ) {}

  ngOnInit() {
    this.result = null;
  }

  async searchWallet() {
    this.result = await this.searchService.findWalletAddress({owner_name: this.name, phone_number: this.phone_number});
    console.log(this.result);
    return this.result;
  }

  async copyAddress(address: string) {
    await this.Clipboard.write({
      // eslint-disable-next-line id-blacklist
      string: address.toString(),
    })
      .then(() => {
        this.notice('Address copied!');
      })
      .catch(() => {
        this.notice('Something weird happened, please try again!');
      });
  }

  async notice(message: string): Promise<HTMLIonToastElement> {
    return showToast(this.toastCtrl, message, {
      color: 'white',
      duration: 2000,
    });
  }
}
