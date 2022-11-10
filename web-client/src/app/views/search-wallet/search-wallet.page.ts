import { Component, Input, OnInit } from '@angular/core';
import { Clipboard } from '@capacitor/clipboard';
import { ToastController } from '@ionic/angular';
import { SearchService, WalletAddress } from '../../services/search.service';
import { showToast } from '../../utils/toast.helpers';

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
    private toastCtrl: ToastController
  ) {}

  ngOnInit() {
    this.result = null;
  }

  async searchWallet() {
    this.result = await this.searchService.findWalletAddress({
      owner_name: this.name,
      phone_number: this.phone_number,
    });
    return this.result;
  }

  async copyAddress(address?: WalletAddress) {
    await this.Clipboard.write({
      // eslint-disable-next-line id-blacklist
      string: address?.toString(),
    })
      .then(() => {
        this.notice('Address copied!');
      })
      .catch((err) => {
        this.notice('Something weird happened, please try again!');
        console.log(err);
      });
  }

  async notice(message: string): Promise<HTMLIonToastElement> {
    return showToast(this.toastCtrl, message, {
      color: 'white',
      duration: 2000,
    });
  }
}
