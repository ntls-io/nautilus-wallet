import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IonicModule } from '@ionic/angular';
import { QRCodeModule } from 'angularx-qrcode';
import { NgxPrinterModule } from 'ngx-printer';
import { ActionItemComponent } from 'src/app/components/action-item/action-item.component';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { ProfileCardHorizontalComponent } from 'src/app/components/profile-card-horizontal/profile-card-horizontal.component';

@NgModule({
  declarations: [
    HeaderComponent,
    ActionItemComponent,
    ProfileCardHorizontalComponent,
  ],
  imports: [IonicModule, CommonModule, RouterModule],
  exports: [
    FontAwesomeModule,
    QRCodeModule,
    NgxPrinterModule,
    HeaderComponent,
    ProfileCardHorizontalComponent,
    ActionItemComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SharedModule {}
