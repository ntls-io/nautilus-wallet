import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TriggersPage } from './triggers.page';

const routes: Routes = [
  {
    path: '',
    component: TriggersPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TriggersPageRoutingModule {}
