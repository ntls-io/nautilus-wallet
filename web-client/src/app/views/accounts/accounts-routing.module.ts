import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccountsPage } from './accounts.page';

const routes: Routes = [
  {
    path: '',
    component: AccountsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountsPageRoutingModule {}
