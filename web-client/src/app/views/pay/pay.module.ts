import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { PayPageRoutingModule } from './pay-routing.module';
import { PayPage } from './pay.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    PayPageRoutingModule,
    SharedModule,
  ],
  declarations: [PayPage],
})
export class PayPageModule {}
