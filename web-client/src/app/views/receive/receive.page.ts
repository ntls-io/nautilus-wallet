import { Component, OnInit } from '@angular/core';
import { Clipboard } from '@capacitor/clipboard';
import { ToastController } from '@ionic/angular';
import { SessionQuery } from 'src/app/state/session.query';
import { showToast } from 'src/app/utils/toast.helpers';

@Component({
  selector: 'app-receive',
  templateUrl: './receive.page.html',
  styleUrls: ['./receive.page.scss'],
})
export class ReceivePage implements OnInit {
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

  async notice(message: string): Promise<HTMLIonToastElement> {
    return showToast(this.toastCtrl, message, {
      color: 'white',
      duration: 2000,
    });
  }
}
