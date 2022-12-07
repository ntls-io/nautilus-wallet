import { Injectable } from '@angular/core';
import { CapacitorHttp } from '@capacitor/core';
import { createUrlWith } from 'src/app/utils/http.helpers';
import { SessionQuery } from '../session.query';
import { Bookmark } from './bookmark.model';
import { BookmarkStore } from './bookmark.store';

@Injectable({ providedIn: 'root' })
export class BookmarkService {
  constructor(
    private bookmarkStore: BookmarkStore,
    private sessionQuery: SessionQuery
  ) {}

  async createBookmark(bookmark: Bookmark) {
    const wallet_id = this.sessionQuery.getValue().wallet?.wallet_id;

    const data = {
      method: 'CreateBookmark',
      params: {
        wallet_id,
        bookmark,
      },
    };

    return await CapacitorHttp.post({
      url: createUrlWith('data'),
      data,
    }).catch((error) => {
      console.log(error);
    });
  }

  async getBookmarks() {
    const wallet_id = this.sessionQuery.getValue().wallet?.wallet_id;

    const data = {
      method: 'GetBookmarks',
      params: {
        wallet_id,
      },
    };

    return await CapacitorHttp.post({
      url: createUrlWith('data'),
      data,
    }).catch((error) => {
      console.log(error);
    });
  }
}
