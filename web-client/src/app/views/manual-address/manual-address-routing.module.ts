import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManualAddressPage } from './manual-address.page';

const routes: Routes = [
  {
    path: '',
    component: ManualAddressPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManualAddressPageRoutingModule {}
