import { Component, OnInit } from '@angular/core';
import { Printer } from '@awesome-cordova-plugins/printer/ngx';
import { Clipboard } from '@capacitor/clipboard';
import { Capacitor } from '@capacitor/core';
import { ToastController } from '@ionic/angular';
import { NgxPrinterService } from 'ngx-printer';
import { SessionQuery } from 'src/app/state/session.query';
import { showToast } from 'src/app/utils/toast.helpers';

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
    public sessionQuery: SessionQuery,
    public printerService: NgxPrinterService,
    private nativePrinter: Printer
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

  async print() {
    if (Capacitor.isNativePlatform()) {
      await this.nativePrinter.check().then((available) => {
        console.log(available);
      });
    } else {
      this.printerService.printDiv('print-section');
    }
  }

  async notice(message: string): Promise<HTMLIonToastElement> {
    return showToast(this.toastCtrl, message, {
      color: 'white',
      duration: 2000,
    });
  }
}
