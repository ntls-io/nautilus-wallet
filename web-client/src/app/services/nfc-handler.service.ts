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
    await this.nfc
      .enabled()
      .then((success) => {
        console.log(success);
        this.listenToNFC();
      })
      .catch((err) => {
        console.log('NFC Check error ', err);
        this.nfc.showSettings();
      });
  }

  listenToNFC() {
    this.nfc
      .addTagDiscoveredListener(
        (onSuccess: any) => console.log('onSuccess ', onSuccess),
        (onFailure: any) => console.log('onFailure ', onFailure)
      )
      .subscribe((data) => {
        if (data && data.tag && data.tag.id) {
          const tagId = this.nfc.bytesToHexString(data.tag.id);
          if (tagId) {
            console.log('success ', tagId);
          } else {
            console.log('error ', 'NFC_NOT_DETECTED');
          }
        }
      });
  }

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
