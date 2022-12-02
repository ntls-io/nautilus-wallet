import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-bookmark',
  templateUrl: './new-bookmark.component.html',
  styleUrls: ['./new-bookmark.component.scss'],
})
export class NewBookmarkComponent implements OnInit {
  bookmark = {
    name: '',
    address: '',
  };
  constructor() {}

  ngOnInit() {}

  createBookmark() {
    console.log('createBookmark');
  }
}
