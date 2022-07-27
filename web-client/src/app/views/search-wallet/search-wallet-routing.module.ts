import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SearchWalletPage } from './search-wallet.page';

const routes: Routes = [
  {
    path: '',
    component: SearchWalletPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SearchWalletPageRoutingModule {}
