import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Printer } from '@awesome-cordova-plugins/printer/ngx';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IonicModule } from '@ionic/angular';
import { QRCodeModule } from 'angularx-qrcode';
import { NgxPrinterModule } from 'ngx-printer';
import { ActionItemComponent } from 'src/app/components/action-item/action-item.component';
import { AssetAccordionComponent } from 'src/app/components/asset-accordion/asset-accordion.component';
import { BalanceSummaryCardComponent } from 'src/app/components/balance-summary-card/balance-summary-card.component';
import { BookmarkListComponent } from 'src/app/components/bookmark-list/bookmark-list.component';
import { LogoutButtonComponent } from 'src/app/components/logout-button/logout-button.component';
import { NewBookmarkComponent } from 'src/app/components/new-bookmark/new-bookmark.component';
import { ProfileCardHorizontalComponent } from 'src/app/components/profile-card-horizontal/profile-card-horizontal.component';
import { SecurityQuestionsComponent } from 'src/app/components/security-questions/security-questions.component';
import { AssetPipesModule } from 'src/app/pipes/asset-pipes.module';

@NgModule({
  declarations: [
    ActionItemComponent,
    ProfileCardHorizontalComponent,
    SecurityQuestionsComponent,
    BalanceSummaryCardComponent,
    AssetAccordionComponent,
    LogoutButtonComponent,
    NewBookmarkComponent,
    BookmarkListComponent,
  ],
  imports: [
    IonicModule,
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    // XXX: The build doesn't actually fail when this FontAwesomeModule import is missing,
    //      but removing it silently breaks fa-icon rendering in production builds (but not development).
    FontAwesomeModule,
    AssetPipesModule,
  ],
  exports: [
    FontAwesomeModule,
    QRCodeModule,
    NgxPrinterModule,
    FormsModule,
    ReactiveFormsModule,
    ProfileCardHorizontalComponent,
    ActionItemComponent,
    SecurityQuestionsComponent,
    BalanceSummaryCardComponent,
    AssetAccordionComponent,
    LogoutButtonComponent,
    NewBookmarkComponent,
    BookmarkListComponent,
  ],
  providers: [Printer],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SharedModule {}
