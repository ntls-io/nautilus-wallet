import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrintWalletPage } from './print-wallet.page';

const routes: Routes = [
  {
    path: '',
    component: PrintWalletPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PrintWalletPageRoutingModule {}
