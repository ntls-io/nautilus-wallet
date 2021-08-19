import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { ReceivePageRoutingModule } from './receive-routing.module';
import { ReceivePage } from './receive.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReceivePageRoutingModule,
    SharedModule,
  ],
  declarations: [ReceivePage],
})
export class ReceivePageModule {}
