import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { PureWalletPageComponentModule } from 'src/app/components/pure-wallet-page/pure-wallet-page.module';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { WalletPageRoutingModule } from './wallet-routing.module';
import { WalletPage } from './wallet.page';
import { IonIntlTelInputModule } from 'ion-intl-tel-input';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    WalletPageRoutingModule,
    SharedModule,
    IonIntlTelInputModule,
    PureWalletPageComponentModule,
  ],
  declarations: [WalletPage],
  exports: [WalletPage],
})
export class WalletPageModule {}
