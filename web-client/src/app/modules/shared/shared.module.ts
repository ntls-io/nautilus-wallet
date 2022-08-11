import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Printer } from '@awesome-cordova-plugins/printer/ngx';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IonicModule } from '@ionic/angular';
import { QRCodeModule } from 'angularx-qrcode';
import { NgxPrinterModule } from 'ngx-printer';
import { ActionItemComponent } from 'src/app/components/action-item/action-item.component';
import { AssetAccordionComponent } from 'src/app/components/asset-accordion/asset-accordion.component';
import { BalanceSummaryCardComponent } from 'src/app/components/balance-summary-card/balance-summary-card.component';
import { ProfileCardHorizontalComponent } from 'src/app/components/profile-card-horizontal/profile-card-horizontal.component';
import { AssetPipesModule } from 'src/app/pipes/asset-pipes.module';

@NgModule({
  declarations: [
    ActionItemComponent,
    ProfileCardHorizontalComponent,
    BalanceSummaryCardComponent,
    AssetAccordionComponent,
  ],
  imports: [
    IonicModule,
    CommonModule,
    RouterModule,
    // XXX: The build doesn't actually fail when this FontAwesomeModule import is missing,
    //      but removing it silently breaks fa-icon rendering in production builds (but not development).
    FontAwesomeModule,
    AssetPipesModule,
  ],
  exports: [
    FontAwesomeModule,
    QRCodeModule,
    NgxPrinterModule,
    ReactiveFormsModule,
    ProfileCardHorizontalComponent,
    ActionItemComponent,
    BalanceSummaryCardComponent,
    AssetAccordionComponent,
  ],
  providers: [Printer],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SharedModule {}
