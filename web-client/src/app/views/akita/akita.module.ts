import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AkitaPageRoutingModule } from './akita-routing.module';

import { AkitaPage } from './akita.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AkitaPageRoutingModule
  ],
  declarations: [AkitaPage]
})
export class AkitaPageModule {}
