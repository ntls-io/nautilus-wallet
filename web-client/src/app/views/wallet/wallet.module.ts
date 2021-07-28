import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { WalletPageRoutingModule } from './wallet-routing.module';
import { WalletPage } from './wallet.page';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, WalletPageRoutingModule],
  declarations: [WalletPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class WalletPageModule {}
