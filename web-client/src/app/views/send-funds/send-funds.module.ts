import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SendFundsPageRoutingModule } from './send-funds-routing.module';
import { SendFundsPage } from './send-funds.page';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, SendFundsPageRoutingModule],
  declarations: [SendFundsPage],
})
export class SendFundsPageModule {}
