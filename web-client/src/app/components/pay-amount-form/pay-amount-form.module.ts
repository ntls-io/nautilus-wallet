import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AssetPipesModule } from 'src/app/pipes/asset-pipes.module';
import { TransactionFeePipe } from 'src/app/pipes/transaction-fee.pipe';
import { PayAmountFormComponent } from './pay-amount-form.component';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, IonicModule, AssetPipesModule],
  declarations: [PayAmountFormComponent, TransactionFeePipe],
  exports: [PayAmountFormComponent],
})
export class PayAmountFormComponentModule {}
