import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { AssetPipesModule } from 'src/app/pipes/asset-pipes.module';
import { AssetAccordionComponent } from '../asset-accordion/asset-accordion.component';
import { BalanceSummaryCardComponent } from './balance-summary-card.component';

@NgModule({
  imports: [CommonModule, IonicModule, AssetPipesModule],
  declarations: [BalanceSummaryCardComponent, AssetAccordionComponent],
  exports: [BalanceSummaryCardComponent],
})
export class BalanceSummaryCardComponentModule {}
