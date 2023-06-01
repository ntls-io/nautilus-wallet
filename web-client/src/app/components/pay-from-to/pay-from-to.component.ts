import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { BookmarkQuery } from 'src/app/state/bookmark';
import { AssetAmount } from 'src/app/utils/assets/assets.common';

@Component({
  selector: 'app-pay-from-to',
  templateUrl: './pay-from-to.component.html',
  styleUrls: ['./pay-from-to.component.scss'],
})
export class PayFromToComponent implements OnChanges {
  // XXX(Pi): Add null to type for async pipe. See: <https://github.com/angular/angular/issues/43727>

  @Input() name?: string | null;
  @Input() balance?: AssetAmount | null;
  @Input() receiverAddress?: string | null;
  receiverName: string | undefined;

  constructor(private bookmarkQuery: BookmarkQuery) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes.receiverAddress) {
      const senderBookmark = this.bookmarkQuery.getAll({
        filterBy: (bookmark) =>
          bookmark.address === changes.receiverAddress.currentValue,
      });

      this.receiverName = senderBookmark[0]?.name;
    }
  }
}
