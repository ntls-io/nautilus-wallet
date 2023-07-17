import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SchedulePayPage } from './schedule-pay.page';

const routes: Routes = [
  {
    path: '',
    component: SchedulePayPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SchedulePayPageRoutingModule {}
