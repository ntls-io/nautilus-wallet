import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { KycPageRoutingModule } from './kyc-routing.module';

import { KycPage } from './kyc.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    KycPageRoutingModule
  ],
  declarations: [KycPage]
})
export class KycPageModule {}
