import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { ScannerPageRoutingModule } from './scanner-routing.module';
import { ScannerPage } from './scanner.page';
import { IonIntlTelInputModule } from 'ion-intl-tel-input';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ScannerPageRoutingModule,
    IonIntlTelInputModule,
    ZXingScannerModule,
  ],
  declarations: [ScannerPage],
})
export class ScannerPageModule {}
