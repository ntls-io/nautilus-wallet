import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { ScannerPageRoutingModule } from './scanner-routing.module';
import { ScannerPage } from './scanner.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ScannerPageRoutingModule,
    SharedModule,
    // XXX: SharedModule also declares XingScannerModule, but it might better belong here?
    ZXingScannerModule,
  ],
  declarations: [ScannerPage],
})
export class ScannerPageModule {}
