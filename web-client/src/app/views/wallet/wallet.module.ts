import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { PureWalletPageComponentModule } from 'src/app/components/pure-wallet-page/pure-wallet-page.module';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { WalletPageRoutingModule } from './wallet-routing.module';
import { WalletPage } from './wallet.page';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    WalletPageRoutingModule,
    SharedModule,
    PureWalletPageComponentModule,
  ],
  declarations: [WalletPage],
  exports: [WalletPage],
})
export class WalletPageModule {}
