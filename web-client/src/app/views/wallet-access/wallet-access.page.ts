import { Component, OnInit } from '@angular/core';
import { Capacitor } from '@capacitor/core';

@Component({
  selector: 'app-wallet-access',
  templateUrl: './wallet-access.page.html',
  styleUrls: ['./wallet-access.page.scss'],
})
export class WalletAccessPage implements OnInit {
  hasCamera: boolean | undefined;

  constructor() {}

  ngOnInit() {
    this.hasCamera = Capacitor.isPluginAvailable('Camera');
  }
}
