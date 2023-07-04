import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecurringPayPage } from './recurring-pay.page';

const routes: Routes = [
  {
    path: '',
    component: RecurringPayPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecurringPayPageRoutingModule {}
