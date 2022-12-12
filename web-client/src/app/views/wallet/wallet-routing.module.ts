import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WalletPage } from './wallet.page';

export const routes: Routes = [
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
  {
    path: 'receive',
    loadChildren: () =>
      import('../receive/receive.module').then((m) => m.ReceivePageModule),
  },
  {
    path: 'transfer-funds',
    loadChildren: () =>
      import('../transfer-funds/transfer-funds.module').then(
        (m) => m.TransferFundsPageModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WalletPageRoutingModule {}
