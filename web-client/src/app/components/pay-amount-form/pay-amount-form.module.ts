import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AssetPipesModule } from 'src/app/pipes/asset-pipes.module';
import { PureWalletPageComponentModule } from '../pure-wallet-page/pure-wallet-page.module';
import { TransactionFeesComponentModule } from '../transaction-fees/transaction-fees.module';
import { PayAmountFormComponent } from './pay-amount-form.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    AssetPipesModule,
    TransactionFeesComponentModule,
    PureWalletPageComponentModule,
  ],
  declarations: [PayAmountFormComponent],
  exports: [PayAmountFormComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PayAmountFormComponentModule {}
