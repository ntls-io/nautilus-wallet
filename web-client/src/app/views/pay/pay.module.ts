import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { InputMaskModule } from '@ngneat/input-mask';
import { PayFromToModule } from 'src/app/components/pay-from-to/pay-from-to.module';
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
    InputMaskModule.forRoot({ inputSelector: 'input', isAsync: true }),
    PayFromToModule,
  ],
  declarations: [PayPage],
})
export class PayPageModule {}
