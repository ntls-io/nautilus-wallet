import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CountrySelectionPageRoutingModule } from './country-selection-routing.module';

import { CountrySelectionPage } from './country-selection.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CountrySelectionPageRoutingModule
  ],
  declarations: [CountrySelectionPage]
})
export class CountrySelectionPageModule {}
