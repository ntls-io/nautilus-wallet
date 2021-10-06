import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { InputMaskModule } from '@ngneat/input-mask';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { LockscreenPageRoutingModule } from './lockscreen-routing.module';
import { LockscreenPage } from './lockscreen.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LockscreenPageRoutingModule,
    SharedModule,
    InputMaskModule.forRoot({ inputSelector: 'input', isAsync: true }),
  ],
  declarations: [LockscreenPage],
})
export class LockscreenPageModule {}
