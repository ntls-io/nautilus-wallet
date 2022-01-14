import { Component, OnInit } from '@angular/core';
import { Clipboard } from '@capacitor/clipboard';
import { ToastController } from '@ionic/angular';
import { SessionQuery } from 'src/app/stores/session';

@Component({
  selector: 'app-print-wallet',
  templateUrl: './print-wallet.page.html',
  styleUrls: ['./print-wallet.page.scss'],
})
export class PrintWalletPage implements OnInit {
  // Hook for testing
  public Clipboard = Clipboard;

  constructor(
    private toastCtrl: ToastController,
    public sessionQuery: SessionQuery
  ) {}

  ngOnInit() {}

  async copyAddress(address: string) {
    await this.Clipboard.write({
      // eslint-disable-next-line id-blacklist
      string: address,
    })
      .then(() => {
        this.notice('Address copied!');
      })
      .catch(() => {
        this.notice('Something weird happened, please try again!');
      });
  }

  async notice(message: string) {
    const toast = await this.toastCtrl.create({
      message,
      color: 'white',
      duration: 2000,
    });
    toast.present();
  }
}
