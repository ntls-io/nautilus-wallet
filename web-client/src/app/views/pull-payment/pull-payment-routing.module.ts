import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PullPaymentPage } from './pull-payment.page';

const routes: Routes = [
  {
    path: '',
    component: PullPaymentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PullPaymentPageRoutingModule {}
