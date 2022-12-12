import { Injectable } from '@angular/core';
import { CapacitorHttp } from '@capacitor/core';
import { ToastController } from '@ionic/angular';
import { createUrlWith } from 'src/app/utils/http.helpers';
import { SessionQuery } from '../session.query';
import { Bookmark } from './bookmark.model';
import { BookmarkStore } from './bookmark.store';

@Injectable({ providedIn: 'root' })
export class BookmarkService {
  constructor(
    private bookmarkStore: BookmarkStore,
    private sessionQuery: SessionQuery,
    private toastCtrl: ToastController
  ) {}

  async createBookmark(bookmark: Bookmark) {
    const wallet_id = this.sessionQuery.getValue().wallet?.wallet_id;

    const data = {
      wallet_id,
      bookmark,
    };

    return await CapacitorHttp.post({
      url: createUrlWith('bookmark/create'),
      data,
    })
      .then((result) => {
        if (result.data?.success) {
          this.getBookmarks();
          this.showSuccess();
        }
      })
      .catch((error) => {
        console.log(error);
        throw error;
      });
  }

  async getBookmarks() {
    const wallet_id = this.sessionQuery.getValue().wallet?.wallet_id;

    if (wallet_id) {
      return await CapacitorHttp.get({
        url: createUrlWith('bookmarks'),
        params: { wallet_id },
      }).catch((error) => {
        console.log(error);
      });
    }
  }

  async showSuccess() {
    const toast = await this.toastCtrl.create({
      message: 'Bookmark created',
      duration: 2000,
      color: 'success',
    });

    return toast.present();
  }
}
