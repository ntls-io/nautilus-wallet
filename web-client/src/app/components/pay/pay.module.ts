import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { PayAmountConfirmComponentModule } from 'src/app/components/pay-amount-confirm/pay-amount-confirm.module';
import { AssetPipesModule } from 'src/app/pipes/asset-pipes.module';
import { PayComponent } from './pay.component';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    PayAmountConfirmComponentModule,
    AssetPipesModule,
  ],
  declarations: [PayComponent],
  exports: [PayComponent],
})
export class PayComponentModule {}
