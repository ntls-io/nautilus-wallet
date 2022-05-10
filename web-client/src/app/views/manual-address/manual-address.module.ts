import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { ManualAddressPageRoutingModule } from './manual-address-routing.module';
import { ManualAddressPage } from './manual-address.page';
import { IonIntlTelInputModule } from 'ion-intl-tel-input';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ManualAddressPageRoutingModule,
    IonIntlTelInputModule,
    SharedModule,
  ],
  declarations: [ManualAddressPage],
})
export class ManualAddressPageModule {}
