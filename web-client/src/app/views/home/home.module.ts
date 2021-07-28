import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IonicModule } from '@ionic/angular';
import { ActionItemComponent } from 'src/app/components/action-item/action-item.component';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { ProfileCardHorizontalComponent } from 'src/app/components/profile-card-horizontal/profile-card-horizontal.component';
import { HomePageRoutingModule } from './home-routing.module';
import { HomePage } from './home.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    FontAwesomeModule,
  ],
  declarations: [
    HomePage,
    HeaderComponent,
    ActionItemComponent,
    ProfileCardHorizontalComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HomePageModule {}
