import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SendFundsPage } from './send-funds.page';

export const routes: Routes = [
  {
    path: '',
    component: SendFundsPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SendFundsPageRoutingModule {}
