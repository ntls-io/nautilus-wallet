import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PayAmountFormComponent } from './pay-amount-form.component';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule],
  declarations: [PayAmountFormComponent],
  exports: [PayAmountFormComponent],
})
export class PayAmountFormComponentModule {}
