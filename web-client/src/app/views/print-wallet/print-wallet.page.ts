import { Component, Input, OnInit } from '@angular/core';
import { Clipboard } from '@capacitor/clipboard';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-print-wallet',
  templateUrl: './print-wallet.page.html',
  styleUrls: ['./print-wallet.page.scss'],
})
export class PrintWalletPage implements OnInit {
  @Input() wallet!: string;

  constructor(private toastCtrl: ToastController) {}

  ngOnInit() {}

  async copyAddress(address: string) {
    await Clipboard.write({
      // eslint-disable-next-line id-blacklist
      string: address,
    });
    this.notice();
  }

  async notice() {
    const toast = await this.toastCtrl.create({
      message: 'Address copied!',
      color: 'white',
      duration: 2000,
    });
    toast.present();
  }
}
