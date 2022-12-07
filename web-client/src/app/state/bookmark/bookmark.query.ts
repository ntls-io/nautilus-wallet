import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { BookmarkStore, BookmarkState } from './bookmark.store';

@Injectable({ providedIn: 'root' })
export class BookmarkQuery extends QueryEntity<BookmarkState> {

  constructor(protected store: BookmarkStore) {
    super(store);
  }

}
