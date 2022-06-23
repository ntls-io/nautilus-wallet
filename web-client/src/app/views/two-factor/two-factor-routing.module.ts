import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TwoFactorPage } from './two-factor.page';

const routes: Routes = [
  {
    path: '',
    component: TwoFactorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TwoFactorPageRoutingModule {}
