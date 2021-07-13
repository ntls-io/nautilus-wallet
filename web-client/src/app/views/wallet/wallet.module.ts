import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { QRCodeModule } from 'angularx-qrcode';
import { WalletPageRoutingModule } from './wallet-routing.module';
import { WalletPage } from './wallet.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WalletPageRoutingModule,
    QRCodeModule,
  ],
  declarations: [WalletPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class WalletPageModule {}
