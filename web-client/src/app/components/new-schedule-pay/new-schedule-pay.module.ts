import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { NewSchedulePayComponent } from './new-schedule-pay.component';

@NgModule({
  declarations: [NewSchedulePayComponent],
  imports: [CommonModule, ReactiveFormsModule, RouterModule, IonicModule],
  exports: [NewSchedulePayComponent],
})
export class NewSchedulePayModule {}
