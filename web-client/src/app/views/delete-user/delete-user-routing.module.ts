import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DeleteUserPage } from './delete-user.page';

const routes: Routes = [
  {
    path: '',
    component: DeleteUserPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DeleteUserPageRoutingModule {}
