import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TwoFactorAuthenticationPage } from './two-factor-authentication.page';

const routes: Routes = [
  {
    path: '',
    component: TwoFactorAuthenticationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TwoFactorAuthenticationPageRoutingModule {}
