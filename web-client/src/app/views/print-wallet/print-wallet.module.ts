import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { PrintWalletPageRoutingModule } from './print-wallet-routing.module';
import { PrintWalletPage } from './print-wallet.page';
import { IonIntlTelInputModule } from 'ion-intl-tel-input';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PrintWalletPageRoutingModule,
    IonIntlTelInputModule,
    SharedModule,
  ],
  declarations: [PrintWalletPage],
})
export class PrintWalletPageModule {}
