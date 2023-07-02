import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NewSchedulePayModule } from 'src/app/components/new-schedule-pay/new-schedule-pay.module';
import { AssetPipesModule } from 'src/app/pipes/asset-pipes.module';
import { PayAmountFormComponentModule } from '../../components/pay-amount-form/pay-amount-form.module';
import { SchedulePayPageRoutingModule } from './schedule-pay-routing.module';
import { SchedulePayPage } from './schedule-pay.page';

@NgModule({
  declarations: [SchedulePayPage],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SchedulePayPageRoutingModule,
    PayAmountFormComponentModule,
    AssetPipesModule,
    NewSchedulePayModule,
  ],
})
export class SchedulePayPageModule {}
