import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TwoFactorPageRoutingModule } from './two-factor-routing.module';

import { TwoFactorPage } from './two-factor.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TwoFactorPageRoutingModule
  ],
  declarations: [TwoFactorPage]
})
export class TwoFactorPageModule {}
