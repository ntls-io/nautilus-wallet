import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { PayAmountFormComponentModule } from 'src/app/components/pay-amount-form/pay-amount-form.module';
import { PayFromToModule } from 'src/app/components/pay-from-to/pay-from-to.module';
import { PayAmountConfirmComponent } from './pay-amount-confirm.component';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    PayFromToModule,
    PayAmountFormComponentModule,
  ],
  declarations: [PayAmountConfirmComponent],
  exports: [PayAmountConfirmComponent],
})
export class PayAmountConfirmComponentModule {}
