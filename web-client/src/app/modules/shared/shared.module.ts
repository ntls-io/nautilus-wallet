import { CommonModule } from '@angular/common';
import {
  CUSTOM_ELEMENTS_SCHEMA,
  NgModule,
  NO_ERRORS_SCHEMA,
} from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IonicModule } from '@ionic/angular';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { QRCodeModule } from 'angularx-qrcode';
import { NgxPrinterModule } from 'ngx-printer';
import { AccountAddressComponent } from 'src/app/components/account-address/account-address.component';
import { AccountBalanceCardComponent } from 'src/app/components/account-balance-card/account-balance-card.component';
import { AccountCardComponent } from 'src/app/components/account-card/account-card.component';
import { ActionItemComponent } from 'src/app/components/action-item/action-item.component';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { PayFromToComponent } from 'src/app/components/pay-from-to/pay-from-to.component';
import { ProfileCardHorizontalComponent } from 'src/app/components/profile-card-horizontal/profile-card-horizontal.component';

@NgModule({
  declarations: [
    HeaderComponent,
    ActionItemComponent,
    ProfileCardHorizontalComponent,
    AccountCardComponent,
    AccountBalanceCardComponent,
    PayFromToComponent,
    AccountAddressComponent,
  ],
  imports: [
    IonicModule,
    CommonModule,
    RouterModule,
    // XXX: The build doesn't actually fail when this FontAwesomeModule import is missing,
    //      but removing it silently breaks fa-icon rendering in production builds (but not development).
    FontAwesomeModule,
  ],
  exports: [
    FontAwesomeModule,
    QRCodeModule,
    NgxPrinterModule,
    ReactiveFormsModule,
    ZXingScannerModule,
    HeaderComponent,
    ProfileCardHorizontalComponent,
    AccountCardComponent,
    ActionItemComponent,
    ReactiveFormsModule,
    ZXingScannerModule,
    AccountBalanceCardComponent,
    PayFromToComponent,
    AccountAddressComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
export class SharedModule {}
