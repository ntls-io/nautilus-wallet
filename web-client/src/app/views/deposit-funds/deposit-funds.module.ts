import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { PayFromToModule } from 'src/app/components/pay-from-to/pay-from-to.module';
import { PurePayPageComponentModule } from 'src/app/components/pure-pay-page/pure-pay-page.module';
import { DepositFundsPageRoutingModule } from './deposit-funds-routing.module';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { DepositFundsPage } from './deposit-funds.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PayFromToModule,
    PurePayPageComponentModule,
    SharedModule,
    DepositFundsPageRoutingModule
  ],
  declarations: [DepositFundsPage]
})
export class DepositFundsPageModule {}
