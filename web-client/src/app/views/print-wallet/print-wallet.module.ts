import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NgxPrinterModule } from 'ngx-printer';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { PrintWalletPageRoutingModule } from './print-wallet-routing.module';
import { PrintWalletPage } from './print-wallet.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PrintWalletPageRoutingModule,
    SharedModule,
    NgxPrinterModule,
  ],
  declarations: [PrintWalletPage],
})
export class PrintWalletPageModule {}
