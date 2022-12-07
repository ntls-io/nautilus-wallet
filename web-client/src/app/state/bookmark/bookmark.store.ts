import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { Bookmark } from './bookmark.model';

export interface BookmarkState extends EntityState<Bookmark> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({
  name: 'bookmark'
})
export class BookmarkStore extends EntityStore<BookmarkState> {

  constructor() {
    super();
  }

}
