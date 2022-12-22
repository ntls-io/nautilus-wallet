import { Injectable } from '@angular/core';
import { CapacitorHttp } from '@capacitor/core';
import { ToastController } from '@ionic/angular';
import { createUrlWith } from 'src/app/utils/http.helpers';
import { SessionQuery } from '../session.query';
import { BookmarkStore } from './bookmark.store';

const headers = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
};

@Injectable({ providedIn: 'root' })
export class BookmarkService {
  constructor(
    private bookmarkStore: BookmarkStore,
    private sessionQuery: SessionQuery,
    private toastCtrl: ToastController
  ) {}

  async createBookmark(bookmark: { name: string; address: string }) {
    const wallet_id = this.sessionQuery.getValue().wallet?.wallet_id;

    const data = {
      wallet_id,
      ...bookmark,
    };

    return await CapacitorHttp.post({
      headers,
      url: createUrlWith('bookmark/create'),
      data,
    })
      .then(({ status }) => {
        if (status === 201) {
          this.getBookmarks();
          this.showSuccess('Bookmark created');
          return true;
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
        headers,
        url: createUrlWith('bookmarks'),
        params: { wallet_id },
      })
        .then(({ status, data }) => {
          if (status === 200) {
            this.bookmarkStore.upsertMany(data);
            this.bookmarkStore.remove(
              (entity: { id: string }) =>
                !data.some(
                  (newEntity: { id: string }) => newEntity.id === entity?.id
                )
            );
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  async deleteBookmark(delete_id: string) {
    return await CapacitorHttp.delete({
      headers,
      url: createUrlWith('bookmark'),
      data: { delete_id },
    })
      .then(({ status }) => {
        if (status === 204) {
          this.showSuccess('Bookmark deleted');
          this.bookmarkStore.remove(delete_id);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async showSuccess(message: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2000,
      color: 'success',
    });

    return toast.present();
  }
}
