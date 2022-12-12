import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { TransferFundsPageRoutingModule } from './transfer-funds-routing.module';
import { TransferFundsPage } from './transfer-funds.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TransferFundsPageRoutingModule,
    SharedModule,
  ],
  declarations: [TransferFundsPage],
})
export class TransferFundsPageModule {}
