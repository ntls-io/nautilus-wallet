import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TranslocoModule } from '@ngneat/transloco';
import { LandingPageRoutingModule } from './landing-routing.module';
import { LandingPage } from './landing.page';
import { IonIntlTelInputModule } from 'ion-intl-tel-input';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LandingPageRoutingModule,
    IonIntlTelInputModule,
    TranslocoModule,
  ],
  declarations: [LandingPage],
})
export class LandingPageModule {}
