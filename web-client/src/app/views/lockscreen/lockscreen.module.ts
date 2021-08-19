import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { LockscreenPageRoutingModule } from './lockscreen-routing.module';
import { LockscreenPage } from './lockscreen.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LockscreenPageRoutingModule,
  ],
  declarations: [LockscreenPage],
})
export class LockscreenPageModule {}
