import { CommonModule } from '@angular/common';
import { Input, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { RegisterPageRoutingModule } from './register-routing.module';
import { RegisterPage } from './register.page';

@NgModule({
  imports: [CommonModule, IonicModule, RegisterPageRoutingModule, SharedModule, ReactiveFormsModule],
  declarations: [RegisterPage],
})
export class RegisterPageModule {}
