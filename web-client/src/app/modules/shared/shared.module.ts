import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IonicModule } from '@ionic/angular';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { QRCodeModule } from 'angularx-qrcode';
import { BrMaskerModule } from 'br-mask';
import { ActionItemComponent } from 'src/app/components/action-item/action-item.component';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { ProfileCardHorizontalComponent } from 'src/app/components/profile-card-horizontal/profile-card-horizontal.component';

@NgModule({
  declarations: [
    HeaderComponent,
    ActionItemComponent,
    ProfileCardHorizontalComponent,
  ],
  imports: [IonicModule, CommonModule, RouterModule, BrMaskerModule],
  exports: [
    FontAwesomeModule,
    QRCodeModule,
    HeaderComponent,
    ProfileCardHorizontalComponent,
    ActionItemComponent,
    BrMaskerModule,
    ReactiveFormsModule,
    ZXingScannerModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SharedModule {}
