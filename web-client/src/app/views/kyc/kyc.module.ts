import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { KycPageRoutingModule } from './kyc-routing.module';
import { KycPage } from './kyc.page';
import { OnfidoFormComponent } from './onfido-form/onfido-form.component';
import { OnfidoWidgetComponent } from './onfido-widget/onfido-widget.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    KycPageRoutingModule,
    SharedModule,
  ],
  declarations: [KycPage, OnfidoFormComponent, OnfidoWidgetComponent],
  exports: [KycPage, OnfidoFormComponent, OnfidoWidgetComponent],
})
export class KycPageModule {}
