import { Component, OnInit } from '@angular/core';
import { BookmarkService } from 'src/app/state/bookmark';

@Component({
  selector: 'app-bookmarks',
  templateUrl: './bookmarks.page.html',
  styleUrls: ['./bookmarks.page.scss'],
})
export class BookmarksPage implements OnInit {
  constructor(private bookmarkService: BookmarkService) {}

  async ionViewWillEnter() {
    await this.bookmarkService.getBookmarks();
  }

  ngOnInit() {}
}
