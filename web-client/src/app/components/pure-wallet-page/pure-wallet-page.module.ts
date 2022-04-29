import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { BalanceSummaryCardComponentModule } from 'src/app/components/balance-summary-card/balance-summary-card.module';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { PureWalletPageComponent } from './pure-wallet-page.component';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    SharedModule,
    BalanceSummaryCardComponentModule,
  ],
  declarations: [PureWalletPageComponent],
  exports: [PureWalletPageComponent],
})
export class PureWalletPageComponentModule {}
