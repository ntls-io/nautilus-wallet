import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AkitaPage } from './akita.page';

const routes: Routes = [
  {
    path: '',
    component: AkitaPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AkitaPageRoutingModule {}
