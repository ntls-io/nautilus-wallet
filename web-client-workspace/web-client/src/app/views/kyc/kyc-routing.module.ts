import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { KycPage } from './kyc.page';

const routes: Routes = [
  {
    path: '',
    component: KycPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class KycPageRoutingModule {}
