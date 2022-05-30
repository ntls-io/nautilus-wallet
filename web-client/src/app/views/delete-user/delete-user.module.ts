import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { IonicModule } from '@ionic/angular';

import { DeleteUserPageRoutingModule } from './delete-user-routing.module';

import { DeleteUserPage } from './delete-user.page';
import { BalanceSummaryCardComponentModule } from 'src/app/components/balance-summary-card/balance-summary-card.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DeleteUserPageRoutingModule,
    BalanceSummaryCardComponentModule,
    FormsModule,
    SharedModule
  ],
  declarations: [DeleteUserPage]
})
export class DeleteUserPageModule {}
