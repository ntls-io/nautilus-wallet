import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IonicModule } from '@ionic/angular';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { QRCodeModule } from 'angularx-qrcode';
import { NgxPrinterModule } from 'ngx-printer';
import { AccountCardComponent } from 'src/app/components/account-card/account-card.component';
import { ActionItemComponent } from 'src/app/components/action-item/action-item.component';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { ProfileCardHorizontalComponent } from 'src/app/components/profile-card-horizontal/profile-card-horizontal.component';

@NgModule({
  declarations: [
    HeaderComponent,
    ActionItemComponent,
    ProfileCardHorizontalComponent,
    AccountCardComponent,
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
    HeaderComponent,
    ProfileCardHorizontalComponent,
    AccountCardComponent,
    ActionItemComponent,
    ReactiveFormsModule,
    ZXingScannerModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SharedModule {}
