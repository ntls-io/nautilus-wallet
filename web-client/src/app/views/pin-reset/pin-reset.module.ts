import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { WalletAccessPage } from '../wallet-access/wallet-access.page';
import { PinResetPageRoutingModule } from './pin-reset-routing.module';
import { PinResetPage } from './pin-reset.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PinResetPageRoutingModule,
    SharedModule,
  ],
  declarations: [PinResetPage],
  providers: [WalletAccessPage],
})
export class PinResetPageModule {}
