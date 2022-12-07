import { Component, OnInit } from '@angular/core';
import { Bookmark, BookmarkService } from 'src/app/state/bookmark';

@Component({
  selector: 'app-new-bookmark',
  templateUrl: './new-bookmark.component.html',
  styleUrls: ['./new-bookmark.component.scss'],
})
export class NewBookmarkComponent implements OnInit {
  bookmark: Bookmark = {
    name: '',
    address: '',
  };
  constructor(private bookmarkService: BookmarkService) {}

  ngOnInit() {}

  async createBookmark() {
    await this.bookmarkService.createBookmark(this.bookmark).then((result) => {
      console.log(result);
    });
  }
}
