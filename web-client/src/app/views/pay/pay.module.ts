import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { PayFromToModule } from 'src/app/components/pay-from-to/pay-from-to.module';
import { PurePayPageComponentModule } from 'src/app/components/pure-pay-page/pure-pay-page.module';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { PayPageRoutingModule } from './pay-routing.module';
import { PayPage } from './pay.page';
import { IonIntlTelInputModule } from 'ion-intl-tel-input';


@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    PayPageRoutingModule,
    SharedModule,
    PurePayPageComponentModule,
    IonIntlTelInputModule,
    PayFromToModule,
  ],
  declarations: [PayPage],
  exports: [PayPage],
})
export class PayPageModule {}
