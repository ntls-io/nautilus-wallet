import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { LockscreenPageModule } from 'src/app/views/lockscreen/lockscreen.module';
import { WalletAccessPageRoutingModule } from './wallet-access-routing.module';
import { WalletAccessPage } from './wallet-access.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WalletAccessPageRoutingModule,
    SharedModule,
    LockscreenPageModule,
  ],
  declarations: [WalletAccessPage],
})
export class WalletAccessPageModule {}
