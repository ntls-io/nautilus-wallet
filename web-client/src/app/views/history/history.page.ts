import { Component, OnInit } from '@angular/core';
import { HistoryQuery, HistoryService } from 'src/app/state/history';

@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
})
export class HistoryPage implements OnInit {
  constructor(
    private historyService: HistoryService,
    public historyQuery: HistoryQuery
  ) {}

  ngOnInit() {}

  ionViewWillEnter() {
    this.getHistory();
  }

  async getHistory() {
    await this.historyService.getTxList();
  }
}
