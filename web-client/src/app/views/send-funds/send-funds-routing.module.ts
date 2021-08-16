import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SendFundsPage } from './send-funds.page';

export const routes: Routes = [
  {
    path: '',
    component: SendFundsPage,
  },
  {
    path: 'scanner',
    loadChildren: () =>
      import('../scanner/scanner.module').then(
        m => m.ScannerPageModule // prettier-ignore
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SendFundsPageRoutingModule {}
