import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { Bookmark } from './bookmark.model';

export type BookmarkState = EntityState<Bookmark>;

@Injectable({ providedIn: 'root' })
@StoreConfig({
  name: 'bookmark',
  resettable: true,
})
export class BookmarkStore extends EntityStore<BookmarkState> {
  constructor() {
    super();
  }
}
