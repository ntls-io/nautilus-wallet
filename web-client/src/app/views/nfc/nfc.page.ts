import { Component, OnInit } from '@angular/core';
import { NfcHandlerService } from 'src/app/services/nfc-handler.service';

@Component({
  selector: 'app-nfc',
  templateUrl: './nfc.page.html',
  styleUrls: ['./nfc.page.scss'],
})
export class NfcPage implements OnInit {
  constructor(private nfcHandler: NfcHandlerService) {}

  ngOnInit() {}

  async check() {
    await this.nfcHandler.checkEnabled();
  }

  async scan() {
    this.nfcHandler.read();
  }

  async write() {
    await this.nfcHandler.writeIos('Hello NFC!');
  }
}
