import { Component, OnInit } from '@angular/core';
import { HistoryQuery, HistoryService } from 'src/app/state/history';
import { SessionQuery } from 'src/app/state/session.query';

@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
})
export class HistoryPage implements OnInit {
  constructor(
    private historyService: HistoryService,
    public historyQuery: HistoryQuery,
    public sessionQuery: SessionQuery
  ) {}

  ngOnInit() {}

  ionViewWillEnter() {
    this.getHistory();
  }

  async getHistory() {
    await this.historyService.getTxList();
  }
}
