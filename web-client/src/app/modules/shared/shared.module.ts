import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Printer } from '@awesome-cordova-plugins/printer/ngx';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IonicModule } from '@ionic/angular';
import { QRCodeModule } from 'angularx-qrcode';
import { NgxPrinterModule } from 'ngx-printer';
import { ActionItemComponent } from 'src/app/components/action-item/action-item.component';
import { ProfileCardHorizontalComponent } from 'src/app/components/profile-card-horizontal/profile-card-horizontal.component';

@NgModule({
  declarations: [ActionItemComponent, ProfileCardHorizontalComponent],
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
    ProfileCardHorizontalComponent,
    ActionItemComponent,
  ],
  providers: [Printer],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SharedModule {}
