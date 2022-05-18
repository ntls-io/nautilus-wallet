import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { IonIntlTelInputModule } from 'ion-intl-tel-input';
import { SimpleMaskModule } from 'ngx-ion-simple-mask';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { RegisterPageRoutingModule } from './register-routing.module';
import { RegisterPage } from './register.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegisterPageRoutingModule,
    SharedModule,
    SimpleMaskModule,
    IonIntlTelInputModule,
  ],
  declarations: [RegisterPage],
})
export class RegisterPageModule {}
