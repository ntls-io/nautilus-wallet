import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { IonIntlTelInputModule } from 'ion-intl-tel-input';
import { SimpleMaskModule } from 'ngx-ion-simple-mask';
import { PinEntryComponentModule } from '../../components/pin-entry/pin-entry.module';
import { SharedModule } from '../../modules/shared/shared.module';
import { WalletAccessPage } from '../wallet-access/wallet-access.page';
import { TwoFactorAuthenticationPageRoutingModule } from './two-factor-authentication-routing.module';
import { TwoFactorAuthenticationPage } from './two-factor-authentication.page';

@NgModule({
  declarations: [TwoFactorAuthenticationPage],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    SimpleMaskModule,
    TwoFactorAuthenticationPageRoutingModule,
    IonIntlTelInputModule,
    SharedModule,
    PinEntryComponentModule,
  ],
  providers: [WalletAccessPage],
})
export class TwoFactorAuthenticationPageModule {}
