import { Injectable } from '@angular/core';
import { Ndef, NFC } from '@awesome-cordova-plugins/nfc/ngx';
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class NfcHandlerService {
  constructor(
    private platform: Platform,
    private nfc: NFC,
    private ndef: Ndef
  ) {}

  async checkEnabled() {
    try {
      const isEnabled = await this.nfc.enabled();
      console.log('NFC Check success ', isEnabled);
    } catch (err) {
      console.log('NFC Check error ', err);
    }
  }

  startSession() {}

  read() {
    if (this.platform.is('ios')) {
      this.readIos();
    } else if (this.platform.is('android')) {
      this.readAndroid();
    }
  }

  write(text: string) {
    if (this.platform.is('ios')) {
      this.writeIos(text);
    } else if (this.platform.is('android')) {
      // this.readAndroid();
    }
  }

  async writeIos(text: string) {
    const message = [this.ndef.textRecord(text)];

    try {
      const result = await this.nfc.write(message);
      console.log('NFC write success ', result);
    } catch (err) {
      console.log('NFC write error ', err);
    }
  }

  async readIos() {
    try {
      const tag = await this.nfc.scanNdef();
      console.log('NFC read success ', JSON.stringify(tag));
    } catch (err) {
      console.log('NFC read success ', err);
    }
  }

  readAndroid() {}
}
