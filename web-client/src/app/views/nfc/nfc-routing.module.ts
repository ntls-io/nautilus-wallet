import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NfcPage } from './nfc.page';

const routes: Routes = [
  {
    path: '',
    component: NfcPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NfcPageRoutingModule {}
