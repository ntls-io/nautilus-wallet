import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WalletPage } from './wallet.page';

const routes: Routes = [
  {
    path: '',
    component: WalletPage,
  },
  {
    path: 'send-funds',
    loadChildren: () =>
      import('../send-funds/send-funds.module').then(
        (m) => m.SendFundsPageModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WalletPageRoutingModule {}
