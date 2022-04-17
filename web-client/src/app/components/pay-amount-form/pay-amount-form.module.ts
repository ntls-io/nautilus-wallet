import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PayAmountFormComponent } from './pay-amount-form.component';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, IonicModule],
  declarations: [PayAmountFormComponent],
  exports: [PayAmountFormComponent],
})
export class PayAmountFormComponentModule {}
