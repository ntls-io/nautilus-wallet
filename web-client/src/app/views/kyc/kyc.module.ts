import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { KycPageRoutingModule } from './kyc-routing.module';
import { KycPage } from './kyc.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    KycPageRoutingModule,
    SharedModule,
  ],
  declarations: [KycPage],
})
export class KycPageModule {}
