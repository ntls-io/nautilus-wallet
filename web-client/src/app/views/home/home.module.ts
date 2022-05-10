import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { HomePageRoutingModule } from './home-routing.module';
import { HomePage } from './home.page';
import { IonIntlTelInputModule } from 'ion-intl-tel-input';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    IonIntlTelInputModule,
    SharedModule,
  ],
  declarations: [HomePage],
})
export class HomePageModule {}
