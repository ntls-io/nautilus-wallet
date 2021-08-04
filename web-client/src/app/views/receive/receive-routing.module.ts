import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReceivePage } from './receive.page';

const routes: Routes = [
  {
    path: '',
    component: ReceivePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReceivePageRoutingModule {}
