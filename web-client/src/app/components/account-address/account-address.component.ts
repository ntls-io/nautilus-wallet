import { Component, Input, OnInit } from '@angular/core';
import { Clipboard } from '@capacitor/clipboard';
import { Capacitor } from '@capacitor/core';
import { Share } from '@capacitor/share';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-account-address',
  templateUrl: './account-address.component.html',
  styleUrls: ['./account-address.component.scss'],
})
export class AccountAddressComponent implements OnInit {
  @Input() address!: string;
  @Input() currency: string | undefined;
  // Hook for testing
  public Clipboard = Clipboard;
  canShare = Capacitor.isPluginAvailable('Share');

  constructor(private toastCtrl: ToastController) {}

  ngOnInit() {}

  async copyAddress() {
    await this.Clipboard.write({
      // eslint-disable-next-line id-blacklist
      string: this.address,
    })
      .then(() => {
        this.notice('Address copied!');
      })
      .catch(() => {
        this.notice('Something weird happened, please try again!', false);
      });
  }

  async shareAddress() {
    await Share.share({
      title: 'See cool stuff',
      text: 'Really awesome thing you need to see right meow',
      dialogTitle: 'Share with buddies',
    });
  }

  async notice(message: string, success: boolean = true) {
    const toast = await this.toastCtrl.create({
      icon: success ? 'checkmark-circle-outline' : 'close-circle-outline',
      message,
      color: success ? 'white' : 'danger',
      duration: 2000,
    });
    toast.present();
  }
}
