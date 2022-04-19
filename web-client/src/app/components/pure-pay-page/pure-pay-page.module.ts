import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { PayComponentModule } from 'src/app/components/pay/pay.module';
import { PurePayPageComponent } from './pure-pay-page.component';

@NgModule({
  imports: [CommonModule, IonicModule, PayComponentModule],
  declarations: [PurePayPageComponent],
  exports: [PurePayPageComponent],
})
export class PurePayPageComponentModule {}
