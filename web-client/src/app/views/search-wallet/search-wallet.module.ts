import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SearchWalletPageRoutingModule } from './search-wallet-routing.module';

import { SearchWalletPage } from './search-wallet.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SearchWalletPageRoutingModule
  ],
  declarations: [SearchWalletPage]
})
export class SearchWalletPageModule {}
