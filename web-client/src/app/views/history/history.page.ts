import { Component, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { BookmarkQuery } from 'src/app/state/bookmark';
import { HistoryQuery, HistoryService } from 'src/app/state/history';
import { SessionQuery } from 'src/app/state/session.query';
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
    private bookmarkQuery: BookmarkQuery
  ) {
    const walletId = this.sessionQuery.getValue().wallet?.wallet_id;
    this.historyQuery.transactions
      .pipe(untilDestroyed(this))
      .subscribe((res) => {
        const txs = res
          .map((item) => {
            const tx = { ...item.tx } as {
              Account: string | undefined;
              Amount: { currency: string; value: string };
              Bookmark: string | undefined;
              Destination: string | undefined;
            };

            const authorAddress =
              tx?.Account === walletId ? tx?.Destination : tx?.Account;

            const bookmarks = this.bookmarkQuery.getAll({
              filterBy: (bookmark) => bookmark.address === authorAddress,
            });

            tx.Bookmark = bookmarks[0]?.name;

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
