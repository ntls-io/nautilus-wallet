import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PayAmountConfirmComponent } from './pay-amount-confirm.component';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule],
  declarations: [PayAmountConfirmComponent],
  exports: [PayAmountConfirmComponent],
})
export class PayAmountConfirmComponentModule {}
