import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { BalanceSummaryCardComponentModule } from 'src/app/components/balance-summary-card/balance-summary-card.module';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { WalletPageRoutingModule } from './wallet-routing.module';
import { WalletPage } from './wallet.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WalletPageRoutingModule,
    SharedModule,
    BalanceSummaryCardComponentModule,
  ],
  declarations: [WalletPage],
})
export class WalletPageModule {}
