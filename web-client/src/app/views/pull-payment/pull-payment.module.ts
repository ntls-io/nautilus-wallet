import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { PullPaymentPageRoutingModule } from './pull-payment-routing.module';
import { PullPaymentPage } from './pull-payment.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PullPaymentPageRoutingModule,
    SharedModule,
  ],
  declarations: [PullPaymentPage],
})
export class PullPaymentPageModule {}
