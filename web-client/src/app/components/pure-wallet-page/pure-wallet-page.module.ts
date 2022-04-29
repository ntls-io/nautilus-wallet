import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PureWalletPageComponent } from './pure-wallet-page.component';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule],
  declarations: [PureWalletPageComponent],
  exports: [PureWalletPageComponent],
})
export class PureWalletPageComponentModule {}
