import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WalletAccessPage } from './wallet-access.page';

const routes: Routes = [
  {
    path: '',
    component: WalletAccessPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WalletAccessPageRoutingModule {}
