import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PullPage } from './pull.page';

const routes: Routes = [
  {
    path: '',
    component: PullPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PullPageRoutingModule {}
