import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from '../../modules/shared/shared.module';
import { RecurringPayPageRoutingModule } from './recurring-pay-routing.module';
import { RecurringPayPage } from './recurring-pay.page';

@NgModule({
  declarations: [RecurringPayPage],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecurringPayPageRoutingModule,
    SharedModule,
  ],
})
export class RecurringPayPageModule {}
