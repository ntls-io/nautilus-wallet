import { Component, Input, OnInit } from '@angular/core';
import { BookmarkQuery } from 'src/app/state/bookmark';

@Component({
  selector: 'app-bookmark-list',
  templateUrl: './bookmark-list.component.html',
  styleUrls: ['./bookmark-list.component.scss'],
})
export class BookmarkListComponent implements OnInit {
  @Input() bookmarks = [];

  constructor(public bookmarkQuery: BookmarkQuery) {}

  ngOnInit() {}

  sendFund() {
    console.log('sendFund');
  }

  deleteBookmark() {
    console.log('deleteBookmark');
  }
}
