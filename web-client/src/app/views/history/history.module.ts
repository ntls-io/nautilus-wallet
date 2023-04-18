import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import * as moment from 'moment';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { IsMePipe } from 'src/app/pipes/is-me.pipe';
import { XrpDatePipe } from 'src/app/pipes/xrp-date.pipe';
import { HistoryPageRoutingModule } from './history-routing.module';
import { HistoryPage } from './history.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HistoryPageRoutingModule,
    SharedModule,
  ],
  declarations: [HistoryPage, XrpDatePipe, IsMePipe],
  providers: [{ provide: 'moment', useValue: moment }],
})
export class HistoryPageModule {}
