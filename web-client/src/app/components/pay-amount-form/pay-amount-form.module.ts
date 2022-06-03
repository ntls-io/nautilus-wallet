import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AssetPipesModule } from 'src/app/pipes/asset-pipes.module';
import { TransactionFeePipe } from 'src/app/pipes/transaction-fee.pipe';
import { TransactionFeesComponent } from '../transaction-fees/transaction-fees.component';
import { PayAmountFormComponent } from './pay-amount-form.component';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, IonicModule, AssetPipesModule],
  declarations: [
    PayAmountFormComponent,
    TransactionFeesComponent,
    TransactionFeePipe,
  ],
  exports: [PayAmountFormComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PayAmountFormComponentModule {}
