import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CountrySelectionPage } from './country-selection.page';

const routes: Routes = [
  {
    path: '',
    component: CountrySelectionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CountrySelectionPageRoutingModule {}
