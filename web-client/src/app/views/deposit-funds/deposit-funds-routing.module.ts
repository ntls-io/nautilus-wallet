import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DepositFundsPage } from './deposit-funds.page';

const routes: Routes = [
  {
    path: '',
    component: DepositFundsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DepositFundsPageRoutingModule {}
