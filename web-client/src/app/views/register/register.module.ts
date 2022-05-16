import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { InputMaskModule } from '@ngneat/input-mask';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { RegisterPageRoutingModule } from './register-routing.module';
import { RegisterPage } from './register.page';
import { IonIntlTelInputModule, IonIntlTelInputValidators } from 'ion-intl-tel-input';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegisterPageRoutingModule,
    SharedModule,
    IonIntlTelInputModule,
    InputMaskModule.forRoot({ inputSelector: 'input', isAsync: true }),
  ],
  declarations: [RegisterPage],
})
export class RegisterPageModule {}
