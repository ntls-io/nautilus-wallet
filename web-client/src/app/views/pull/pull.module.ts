import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PayAmountFormComponentModule } from 'src/app/components/pay-amount-form/pay-amount-form.module';
import { PinEntryComponentModule } from 'src/app/components/pin-entry/pin-entry.module';
import { AssetPipesModule } from 'src/app/pipes/asset-pipes.module';
import { PullPageRoutingModule } from './pull-routing.module';
import { PullPage } from './pull.page';
import { WalletAccessPage } from '../wallet-access/wallet-access.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PullPageRoutingModule,
    PayAmountFormComponentModule,
    AssetPipesModule,
    PinEntryComponentModule,
  ],
  providers: [WalletAccessPage],
  declarations: [PullPage],
})
export class PullPageModule {}
