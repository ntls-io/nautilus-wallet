import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { BecomeConnectorPageRoutingModule } from './become-connector-routing.module';
import { BecomeConnectorPage } from './become-connector.page';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule,
    BecomeConnectorPageRoutingModule,
    SharedModule,
  ],
  declarations: [BecomeConnectorPage],
})
export class BecomeConnectorPageModule {}
