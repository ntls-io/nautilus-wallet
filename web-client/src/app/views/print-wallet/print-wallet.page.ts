import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Printer, PrintOptions } from '@awesome-cordova-plugins/printer/ngx';
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
  @ViewChild('printSection', { static: false, read: ElementRef })
  printSection: ElementRef | undefined;
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
    const content = this.printSection?.nativeElement;
    if (Capacitor.isNativePlatform()) {
      // NOTE: Native is failing when passing HTMLElement, so we passing undefined to print the whole page and hide the unwanted content
      this.nativePrint();
    } else {
      this.printerService.printHTMLElement(content);
    }
  }

  async nativePrint(content: HTMLElement | undefined = undefined) {
    const options: PrintOptions = {
      name: 'MyWallet',
      autoFit: true,
      margin: false,
      photo: true,
    };
    await this.nativePrinter
      .print(content, options)
      .then((success) => {
        console.log('success: ', success);
      })
      .catch((error) => {
        console.log('error: ', error);
      });
  }

  async notice(message: string): Promise<HTMLIonToastElement> {
    return showToast(this.toastCtrl, message, {
      color: 'white',
      duration: 2000,
    });
  }
}
