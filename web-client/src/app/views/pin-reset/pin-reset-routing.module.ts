import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PinResetPage } from './pin-reset.page';

const routes: Routes = [
  {
    path: '',
    component: PinResetPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PinResetPageRoutingModule {}
