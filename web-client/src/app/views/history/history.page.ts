import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HistoryQuery, HistoryService, History } from 'src/app/state/history';
import { SessionQuery } from 'src/app/state/session.query';
import { environment } from 'src/environments/environment';
import {dropsToXrp} from 'xrpl';

@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
})
export class HistoryPage implements OnInit {
  tokenSymbol = environment.tokenSymbol;
  displayTransactions: Observable<History[]> | undefined;

  constructor(
    private historyService: HistoryService,
    public historyQuery: HistoryQuery,
    public sessionQuery: SessionQuery,
  ) {}

  ngOnInit() {}

  ionViewWillEnter() {
    this.getHistory();

    if (environment.hideXrpBalance) {
      this.displayTransactions = this.historyQuery.issuedCurrencyTransactions;
    } else {
      this.displayTransactions = this.historyQuery.allTransactions;
    }
  }

  async getHistory() {
    await this.historyService.getTxList();
  }

  convertdropToxrp(value: string | undefined | { currency?: string | undefined; value?: string | undefined }){
    if(value !== undefined){
      // eslint-disable-next-line id-blacklist
      const xrp = Number(value);
      return dropsToXrp(xrp);
    }
  }

  typeOf(value: any) {
    return typeof value;
  }
}
