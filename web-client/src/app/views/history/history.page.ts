import { Component, OnInit } from '@angular/core';
import { CapacitorHttp, HttpResponse } from '@capacitor/core';

@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
})
export class HistoryPage implements OnInit {
  constructor() {}

  ngOnInit() {}

  ionViewWillEnter() {
    this.getHistory();
  }

  async getHistory() {
    const options = {
      url: 'https://dev.explorer.cbdc.xpring.dev/accounts/rpJv16Qmn2rQP6UC6UFsNRnVy5arkQihPP',
    };

    const response: HttpResponse = await CapacitorHttp.get(options);

    console.log(response);
  }
}
