import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ManualAddressPageRoutingModule } from './manual-address-routing.module';
import { ManualAddressPage } from './manual-address.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ManualAddressPageRoutingModule,
  ],
  declarations: [ManualAddressPage],
})
export class ManualAddressPageModule {}
