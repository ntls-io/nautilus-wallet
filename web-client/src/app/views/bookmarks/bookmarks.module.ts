import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { BookmarksPageRoutingModule } from './bookmarks-routing.module';
import { BookmarksPage } from './bookmarks.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BookmarksPageRoutingModule,
    SharedModule,
  ],
  declarations: [BookmarksPage],
})
export class BookmarksPageModule {}
