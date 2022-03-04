import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { SendFundsPageRoutingModule } from './send-funds-routing.module';
import { SendFundsPage } from './send-funds.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SendFundsPageRoutingModule,
    SharedModule,
  ],
  declarations: [SendFundsPage],
})
export class SendFundsPageModule {}
