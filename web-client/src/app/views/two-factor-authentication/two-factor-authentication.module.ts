import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TwoFactorAuthenticationPageRoutingModule } from './two-factor-authentication-routing.module';
import { IonIntlTelInputModule } from 'ion-intl-tel-input';

import { TwoFactorAuthenticationPage } from './two-factor-authentication.page';
import { SharedModule } from '../../modules/shared/shared.module';
import { SimpleMaskModule } from 'ngx-ion-simple-mask';
import { PinEntryComponentModule } from '../../components/pin-entry/pin-entry.module';
import { WalletAccessPage } from '../wallet-access/wallet-access.page';
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
        PinEntryComponentModule
    ],
    providers: [WalletAccessPage]
})
export class TwoFactorAuthenticationPageModule {}
