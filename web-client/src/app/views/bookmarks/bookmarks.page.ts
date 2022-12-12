import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { BookmarkService } from 'src/app/state/bookmark';

@Component({
  selector: 'app-bookmarks',
  templateUrl: './bookmarks.page.html',
  styleUrls: ['./bookmarks.page.scss'],
})
export class BookmarksPage implements OnInit {
  constructor(
    private bookmarkService: BookmarkService,
    private toastCtrl: ToastController
  ) {}

  async ionViewWillEnter() {
    await this.bookmarkService.getBookmarks();
  }

  ngOnInit() {}
}
