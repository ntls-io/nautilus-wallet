import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TransferFundsPage } from './transfer-funds.page';

const routes: Routes = [
  {
    path: '',
    component: TransferFundsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TransferFundsPageRoutingModule {}
