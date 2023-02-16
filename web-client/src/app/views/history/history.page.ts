import { Component, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { HistoryQuery, HistoryService } from 'src/app/state/history';
import { SessionQuery } from 'src/app/state/session.query';
import { SetupQuery } from 'src/app/state/setup';
import { environment } from 'src/environments/environment';
import { dropsToXrp } from 'xrpl';

@UntilDestroy()
@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
})
export class HistoryPage implements OnInit {
  transactions: any[] = [];
  constructor(
    private historyService: HistoryService,
    public historyQuery: HistoryQuery,
    public sessionQuery: SessionQuery,
    private setupQuery: SetupQuery
  ) {
    this.historyQuery.transactions
      .pipe(untilDestroyed(this))
      .subscribe((res) => {
        const txs = res
          .map((item) => {
            const tx = { ...item.tx } as {
              Amount: { currency: string; value: string };
            };

            if (typeof tx.Amount === 'string') {
              tx.Amount = {
                currency: 'XRP',
                value: dropsToXrp(tx.Amount),
              };
            }
            return tx;
          })
          .filter((item) =>
            environment.hideXrpBalance
              ? item.Amount.currency === environment.tokenSymbol
              : item
          );

        this.transactions = txs;
      });
  }

  ngOnInit() {}

  ionViewWillEnter() {
    this.getHistory();
  }

  async getHistory() {
    await this.historyService.getTxList();
  }
}
