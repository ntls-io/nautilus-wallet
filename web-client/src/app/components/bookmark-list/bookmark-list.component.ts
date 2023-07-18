import { Component, Input, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { BookmarkQuery, BookmarkService } from 'src/app/state/bookmark';
import { SwalHelper } from 'src/app/utils/notification/swal-helper';

@Component({
  selector: 'app-bookmark-list',
  templateUrl: './bookmark-list.component.html',
  styleUrls: ['./bookmark-list.component.scss'],
})
export class BookmarkListComponent implements OnInit {
  @Input() bookmarks = [];

  constructor(
    public bookmarkQuery: BookmarkQuery,
    private bookmarkService: BookmarkService,
    private navCtrl: NavController,
    private notification: SwalHelper
  ) {}

  ngOnInit() {}

  sendFund(address: string) {
    this.navCtrl.navigateForward('pay', {
      state: { address },
    });
  }

  pullPay(address: string) {
    this.navCtrl.navigateForward('pull', {
      state: { address },
    });
  }

  deleteBookmark(id: string) {
    this.notification.swal.fire({
      icon: 'warning',
      titleText: 'Delete bookmark',
      text: 'Are you sure you want to delete this bookmark?',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      showLoaderOnConfirm: true,
      confirmButtonColor: 'var(--ion-color-primary)',
      cancelButtonColor: 'var(--ion-color-medium)',
      reverseButtons: true,
      preConfirm: async () => {
        await this.bookmarkService.deleteBookmark(id);
      },
    });
  }
}
