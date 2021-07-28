import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { WalletPageRoutingModule } from './wallet-routing.module';
import { WalletPage } from './wallet.page';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, WalletPageRoutingModule],
  declarations: [WalletPage, HeaderComponent],
})
export class WalletPageModule {}
