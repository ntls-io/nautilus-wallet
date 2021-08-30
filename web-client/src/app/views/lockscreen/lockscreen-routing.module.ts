import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LockscreenPage } from './lockscreen.page';

const routes: Routes = [
  {
    path: '',
    component: LockscreenPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LockscreenPageRoutingModule {}
