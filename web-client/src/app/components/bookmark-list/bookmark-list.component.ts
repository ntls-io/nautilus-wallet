import { Component, Input, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { BookmarkQuery, BookmarkService } from 'src/app/state/bookmark';

@Component({
  selector: 'app-bookmark-list',
  templateUrl: './bookmark-list.component.html',
  styleUrls: ['./bookmark-list.component.scss'],
})
export class BookmarkListComponent implements OnInit {
  @Input() bookmarks = [];

  constructor(
    public bookmarkQuery: BookmarkQuery,
    private bookmarkService: BookmarkService,
    private navCtrl: NavController
  ) {}

  ngOnInit() {}

  sendFund(receiverAddress: string) {
    this.navCtrl.navigateForward('pay', {
      queryParams: { receiverAddress },
    });
  }

  deleteBookmark(id: string) {
    this.bookmarkService.deleteBookmark(id);
  }
}
