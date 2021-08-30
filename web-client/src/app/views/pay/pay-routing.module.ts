import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PayPage } from './pay.page';

const routes: Routes = [
  {
    path: '',
    component: PayPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PayPageRoutingModule {}
